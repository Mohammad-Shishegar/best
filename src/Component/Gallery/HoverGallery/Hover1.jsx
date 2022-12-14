import React, { Fragment } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { H5, Image } from '../../../AbstractElements';
import { HoverEffect } from '../../../Constant';

const Hover1 = () => {
  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader className="pb-0">
              <H5>{HoverEffect} <span>{'1'}</span></H5>
            </CardHeader>
            <CardBody>
              <Row id="aniimated-thumbnials" className="my-gallery gallery">

                <figure itemProp="associatedMedia" className="col-md-3 col-6 img-hover hover-1">
                    <div className="">
                      <Image attrImage={{
                        src: `${require('../../../assets/images/lightgallry/08.jpg')}`, itemProp: 'thumbnail', alt: '' , className:'img-fluid'
                      }} />
                    </div>
                </figure>
                <figure itemProp="associatedMedia" className="col-md-3 col-6 img-hover hover-1">
                  <div>
                    <Image attrImage={{
                      src: `${require('../../../assets/images/lightgallry/09.jpg')}`, itemProp: 'thumbnail', alt: '', className:'img-fluid'
                    }} />
                  </div>
                </figure>
                <figure itemProp="associatedMedia" className="col-md-3 col-6 img-hover hover-1">
                    <div>
                      <Image attrImage={{
                        src: `${require('../../../assets/images/lightgallry/010.jpg')}`, itemProp: 'thumbnail', alt: '', className:'img-fluid'
                      }} />
                    </div>
                </figure>
                <figure itemProp="associatedMedia" className="col-md-3 col-6 img-hover hover-1">
                    <div >
                      <Image attrImage={{
                        src: `${require('../../../assets/images/lightgallry/011.jpg')}`, itemProp: 'thumbnail', alt: '', className:'img-fluid'
                      }} />
                    </div>                  
                </figure>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </Fragment>
  );
};

export default Hover1;