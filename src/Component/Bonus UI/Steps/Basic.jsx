import React, { Fragment } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { H5, P } from '../../../AbstractElements';

const BasicClass = () => {
    return (
        <Fragment>
            <Col sm="12">
                <Card>
                    <CardHeader className="pb-0">
                        <H5>{'Default Step'}</H5>
                    </CardHeader>
                    <CardBody>
                        <Row className="u-steps">
                            <Col sm="4" className="u-step"><span className="u-step-number">1</span>
                                <div className="u-step-desc"><span className="u-step-title">Shopping</span>
                                    <P>Choose what you want</P>
                                </div>
                            </Col>
                            <Col sm="4" className="u-step current"><span className="u-step-number">2</span>
                                <div className="u-step-desc"><span className="u-step-title">Billing</span>
                                    <P>Pay for the bill</P>
                                </div>
                            </Col>
                            <Col sm="4" className="u-step"><span className="u-step-number">3</span>
                                <div className="u-step-desc"><span className="u-step-title">Getting</span>
                                    <P>Waiting for the goods</P>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    );
};

export default BasicClass;