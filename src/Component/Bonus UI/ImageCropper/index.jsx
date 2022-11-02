import React, { Fragment, useState, useRef } from 'react';
import { Container, Card, CardBody, CardHeader, Input } from 'reactstrap';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { ImageCropper } from '../../../Constant';
import { H5 } from '../../../AbstractElements';
import { useDebounceEffect } from './useDebounceEffect';
import { canvasPreview } from './canvasPreview';

function centerAspectCrop(
  mediaWidth, mediaHeight, aspect,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 30,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}
const ImagecropperContain = () => {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(16 / 9);

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result.toString() || ''),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        );
      }
    },
    100,
    [completedCrop, scale, rotate],
  );
  return (
    <Fragment>
      <Container fluid={true}>
        <Card>
          <CardHeader className="pb-0">
            <H5>{ImageCropper}</H5>
          </CardHeader>
          <CardBody>
            <div className="input-cropper">
              <Input type="file" onChange={onSelectFile} />
            </div>
            {Boolean(imgSrc) && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            )}
            <div>
              {Boolean(completedCrop) && (
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: completedCrop.height,
                  }}
                />
              )}
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};
export default ImagecropperContain;
