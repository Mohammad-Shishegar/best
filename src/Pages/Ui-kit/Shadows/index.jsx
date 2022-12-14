import React, { Fragment } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { Breadcrumbs, H5 } from '../../../AbstractElements';
import { Examples } from '../../../Constant/index';
import LargeShadows from '../../../_core/Ui-kits/Shadows/Large';
import NoShadows from '../../../_core/Ui-kits/Shadows/NoShadow';
import RegularShadows from '../../../_core/Ui-kits/Shadows/Regular';
import SmallShadows from '../../../_core/Ui-kits/Shadows/Small';

const Shadow = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Ui Kits" title="Box Shadow" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card className="box-shadow-title">
              <CardHeader className='pb-0'>
                <H5>{Examples}</H5><span>{'While shadows on components are disabled by default in Bootstrap and can be enabled via'} <code>{'$enable-shadows'}</code>, {'you can also quickly add or remove a shadow with our'} <code>{'box-shadow'}</code> {'utility classes. Includes support for'} <code>{'.shadow-none'}</code> {'and three default sizes (which have associated variables to match).'}</span>
              </CardHeader>
              <CardBody>
                <Row>
                  <LargeShadows />
                  <RegularShadows />
                  <SmallShadows />
                  <NoShadows />
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Shadow;