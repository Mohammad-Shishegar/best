import React, { Fragment } from 'react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Card, CardBody, Col, Container, Row, Form, Label, FormGroup, Input, InputGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { createCategory, deleteCategory, getCategory, updateCategory } from '../../../api/Admin/Category';
import { Add, Cancel, ClientName, EndingDate, EnterSomeDetails, Priority, ProjectRate, ProjectSize, ProjectTitle, ProjectType, StartingDate } from '../../../Constant';
import CategoryTable from '../Table/CategoryTable';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom"

const Category = (props) => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [active, setActive] = useState(false)
  const [showTable, setShowTable] = useState(false)
  const [tableData, setTableData] = useState([])
  const [modal, setModal] = useState(false);
  const [parentId, setParentId] = useState("")
  const [parentName, setParentName] = useState("")
  const [btnMode, setBtnMode] = useState("add");
  const [id, setId] = useState()

  const navigate = useNavigate() 


  const handleDiableBtn = () => {
    if (title)
      return false
    else
      return true
  }

  const toggle = () => setModal(!modal);

  const refreshTable = async () => {
    setShowTable(false)
    const response = await getCategory()
    if (response.data.data) {
      setTableData(response.data.data)
      setShowTable(true)
    }
    if (response.response.data.IsSuccess === false) {
      toast.error("some thing went wrong...")
      setTimeout(() => {
        localStorage.removeItem("token")
        navigate(`${process.env.PUBLIC_URL}/pages/intro`)
      }, 2000)
    }
  }

  const sendData = async () => {
    var response
    if (btnMode == "update") {
      response = await updateCategory(title, active, id, description, parentId, parentName)
    }
    else {
      response = await createCategory(title, active, description, parentId, parentName)
      setModal(!modal)
    }

    if (response.data.isSuccess === true) {
      toast.success("is Success")
      refreshTable()
      setActive(false)
      setTitle("")
      setDescription("")
      setBtnMode("add")
    }
    else if (response.response.data.IsSuccess === false) {
      toast.error("some thing went wrong...")
      setTimeout(() => {
        localStorage.removeItem("token")
        navigate(`${process.env.PUBLIC_URL}/pages/intro`)
      }, 2000)
    }
    else {
      toast.success("An error has occurred on the server")
    }

  }

  useEffect(() => {
    refreshTable()
  }, [])

  const editCategory = async (id) => {
    var temp = tableData
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].id === id) {
        setTitle(temp[i].name)
        setActive(temp[i].activeOrder)
        setDescription("")
        setId(temp[i].id)
      }
    }
    setBtnMode("update")
  }

  const deleteCat = async (id) => {
    const response = await deleteCategory(id)
    if (response.data.isSuccess === true) {
      toast.success("delete is Success")
      refreshTable()
    }
    else if (response.response.data.IsSuccess === false) {
      toast.error("some thing went wrong...")
      setTimeout(() => {
          localStorage.removeItem("token")
          navigate(`${process.env.PUBLIC_URL}/pages/intro`)
      }, 2000)
  }
    else {
      toast.error("An error has occurred on the server")
    }
  }

  const parentCategory = (txt) => {
    if (!txt) {
      setParentId("")
      setParentName("")
    }
    else {
      var temp = tableData
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].name === txt) {
          setParentId(temp[i].id)
          setParentName(temp[i].name)
        }
      }
    }
  }

  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12" style={{ marginTop: "45px" }}>
            <Card >
              <CardBody>
                <Fragment >
                  <Form className="theme-form">
                    <Row>
                      <Col sm="4">
                        <FormGroup >
                          <Label>{"Title"}</Label>
                          <InputGroup>
                            <Input className="form-control" placeholder='Title' value={title} onChange={(txt) => { setTitle(txt.target.value) }} />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="4">
                        <FormGroup >
                          <Label>{"Descrtiption"}</Label>
                          <InputGroup>
                            <Input className="form-control" placeholder='Descrtiption' type="textarea" value={description} onChange={(txt) => { setDescription(txt.target.value) }} />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="4" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <FormGroup className="form-group">
                          <div className="checkbox">
                            <Input id="checkbox1" type="checkbox" checked={active} onClick={() => setActive(!active)} />
                            <Label className="text-muted" for="checkbox1">Active</Label>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col sm="4">
                        <FormGroup>
                          <Label htmlFor="exampleFormControlSelect9">{"Parent"}</Label>
                          <Input type="select" name="select" className="form-control digits" defaultValue="" onChange={(txt) => parentCategory(txt.target.value)}>
                            <option>{ }</option>
                            {tableData.map(item => {
                              return <option>{item.name}</option>
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-end">
                        <div className="mb-0">
                          <Button color={btnMode === "add" ? "secondary" : "primary"}
                            className='me-3'
                            onClick={() => {
                              if (btnMode === "update")
                                sendData()
                              else if (btnMode === "add")
                                toggle()
                            }}
                            disabled={handleDiableBtn()}
                          >{btnMode === "add" ? "Add" : "Update"}</Button>
                        </div>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                      {
                        showTable ? <CategoryTable data={tableData} edit={editCategory} deleteCat={deleteCat} />
                          : ""
                      }
                    </Row>
                  </Form>
                </Fragment>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          Are you sure?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => sendData()}>
            Yes
          </Button>
          <Button color="secondary" onClick={toggle}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};
export default Category;