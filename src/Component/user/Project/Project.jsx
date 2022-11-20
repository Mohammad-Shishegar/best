import React, { Fragment } from 'react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Card, CardBody, Col, Container, Row, Form, Label, FormGroup, Input, InputGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { createProject, updateProject, projectWithDetailes } from '../../../api/User/Project';
import { getCategory } from '../../../api/Admin/ProjectCat';
import ProjectcategoryTable from '../Table/ProjectcategoryTable';
import { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom"

const Project = (props) => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [day, setDay] = useState()
  const [showTable, setShowTable] = useState(false)
  const [tableData, setTableData] = useState([])
  const [modal, setModal] = useState(false);
  const [categoryId, setCategoryId] = useState("")
  const [budget, setBudget] = useState("")
  const [categoryTitle, setCategoryTitle] = useState()
  const [btnMode, setBtnMode] = useState("add");
  const [id, setId] = useState()

  const { state } = useLocation()

  const navigate = useNavigate()

  const handleDiableBtn = () => {
    if (title && categoryId && description && day && budget)
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
      response = await updateProject(title, day, id, description, categoryId, budget)
    }
    else {
      response = await createProject(title, day, description, categoryId, budget)
      setModal(!modal)
    }
    if (response.data.isSuccess && response.data.isSuccess === true) {
      toast.success("is Success")
      refreshTable()
      setDay()
      setTitle("")
      setDescription("")
      setBtnMode("add")
      navigate(`${process.env.PUBLIC_URL}/project/MyProject`)
    }
    else if (response.response.data.IsSuccess === "false") {
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

  useEffect(() => {
    refreshTable()
  }, [])

  const editPro = async (id) => {
    var temp = tableData
    const response = await projectWithDetailes(id)
    var data = response.data.data
    setTitle(data.title)
    setDay(data.day)
    setDescription(data.description)
    setId(data.id)
    setCategoryTitle(data.categoryTitle)
    setCategoryId(data.categoryId)
    setBudget(data.budget)
    setBtnMode("update")
  }

  useEffect(() => {
    if (state) {
      if (state.update === true)
        editPro(state.id)
    }
  }, [state])

  const setCategory = (txt) => {
    if (!txt) {
      setCategoryId("")
      setCategoryTitle("")
    }
    else {
      var temp = tableData
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].title === txt) {
          setCategoryId(temp[i].id)
          setCategoryTitle(temp[i].title)
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
                        <FormGroup>
                          <Label htmlFor="exampleFormControlSelect9">{"Category"}</Label>
                          <Input
                            type="select"
                            name="select"
                            className="form-control digits"
                            value={categoryId && categoryTitle ? categoryTitle : ""}
                            onChange={(txt) => setCategory(txt.target.value)}>
                            <option>{ }</option>
                            {tableData.map(item => {
                              return <option>{item.title}</option>
                            })}
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col sm="4" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <FormGroup >
                          <Label>{"Day"}</Label>
                          <InputGroup>
                            <Input className="form-control" placeholder='please enter number:' value={day} onChange={(txt) => {
                              if ((/^\d+$/).test(txt.target.value))
                                setDay(txt.target.value)
                            }} />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="8">
                        <FormGroup >
                          <Label>{"Descrtiption"}</Label>
                          <InputGroup>
                            <Input className="form-control" placeholder='Descrtiption' type="textarea" value={description} onChange={(txt) => { setDescription(txt.target.value) }} />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="4" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <FormGroup >
                          <Label>{"Budget"}</Label>
                          <InputGroup>
                            <Input className="form-control" placeholder='please enter number:' value={budget} onChange={(txt) => {
                              if ((/^\d+$/).test(txt.target.value))
                                setBudget(txt.target.value)
                            }} />
                          </InputGroup>
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
                    {/* <Row style={{ marginTop: "20px" }}>
                      {
                        showTable ? <ProjectcategoryTable data={tableData} edit={editCategory} deleteCat={deleteCat} />
                          : ""
                      }
                    </Row> */}
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
export default Project;