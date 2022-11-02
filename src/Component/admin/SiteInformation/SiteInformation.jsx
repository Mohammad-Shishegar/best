import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Card, Label, InputGroup, Input, FormGroup, Form, CardBody, Button } from "reactstrap"
import { getSetting, siteSetting } from '../../../api/Admin/SiteSetting'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"


const SiteInformation = () => {

    const [title, setTitle] = useState('')
    const [mailServe, setMailServe] = useState('')
    const [email, setEmail] = useState('')
    const [passwordEmail, setPasswordEmail] = useState('')
    const [metKey, setMetKey] = useState('')
    const [metDec, setMetDec] = useState('')

    const navigate = useNavigate()

    const disableBtn = () => {
        if (title && email && passwordEmail && mailServe && metDec && metKey)
            return false
        return true
    }

    // check
    const getData = async () => {
        const response = await getSetting()
        if (response.response.data.IsSuccess === false) {
            toast.error("some thing went wrong...")
            setTimeout(() => {
                localStorage.removeItem("token")
                navigate(`${process.env.PUBLIC_URL}/pages/intro`)
            }, 2000)
        }
    }

    const SendData = async () => {
        const response = await siteSetting(title, mailServe, email, passwordEmail, metKey, metDec)
        if (response.data.isSuccess === true)
            toast.success("is success")
        else
            toast.error("some thing went wrong...")
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Fragment >
            <Container fluid={true}>
                <Row>
                    <Col sm={12}>
                        <Card style={{ marginTop: '45px' }}>
                            <CardBody>
                                <Form className="theme-form">
                                    <Row>
                                        <Col sm={4}>
                                            <FormGroup >
                                                <Label>{"Title"}</Label>
                                                <InputGroup>
                                                    <Input className="form-control" onChange={(txt) => setTitle(txt.target.value)} />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={4}>
                                            <FormGroup >
                                                <Label>{"Mail Server"}</Label>
                                                <InputGroup>
                                                    <Input className="form-control" onChange={(txt) => setMailServe(txt.target.value)} />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={4}>
                                            <FormGroup >
                                                <Label>{"Email"}</Label>
                                                <InputGroup>
                                                    <Input draggable className="form-control" onChange={(txt) => {
                                                        if ((/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(txt.target.value))
                                                            setEmail(txt.target.value)
                                                        else
                                                            setEmail("")
                                                    }} />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={4}>
                                            <FormGroup >
                                                <Label>{"Emial Password"}</Label>
                                                <InputGroup>
                                                    <Input className="form-control" onChange={(txt) => setPasswordEmail(txt.target.value)} />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={4}>
                                            <FormGroup >
                                                <Label>{"Met Key"}</Label>
                                                <InputGroup>
                                                    <Input className="form-control" onChange={(txt) => setMetKey(txt.target.value)} />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={4}>
                                            <FormGroup >
                                                <Label>{"Met Dec"}</Label>
                                                <InputGroup>
                                                    <Input className="form-control" onChange={(txt) => setMetDec(txt.target.value)} />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col className="text-end">
                                            <div className="mb-0">
                                                <Button
                                                    className='me-3'
                                                    disabled={disableBtn()}
                                                    onClick={() => SendData()}
                                                >Add</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default SiteInformation