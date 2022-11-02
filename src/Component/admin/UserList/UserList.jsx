import React, { Fragment, useEffect } from 'react'
import { Card, CardBody, Col, Container, Row, Form, Label, FormGroup, Input, InputGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Users } from '../../../api/Admin/User';
import UserTable from '../Table/UserTable';
import {toast} from "react-toastify"
import { useState } from 'react';

const UserList = () => {

    const [tableData , setTableData ] = useState()

    const getUser = async () => {
        const response = await Users()
        console.log(response.data.data)
        if(response.data.statusCode !== "Success"){
            toast.error("Some thing went wrong...")
        }
        if(response.data.data){
            setTableData(response.data.data)
        }
    }

    useEffect(()=>{
        getUser()
    } , [])

    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Col sm="12" style={{ marginTop: "45px" }}>
                        <Card>
                            <CardBody>
                                {
                                    tableData ? <UserTable data = {tableData}/> : ""
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default UserList