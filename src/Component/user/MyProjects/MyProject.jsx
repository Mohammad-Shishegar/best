import React, { Fragment } from 'react';
import { toast } from 'react-toastify';
import { useState  , useContext} from 'react';
import { Card, CardBody, Col, Container, Row, Form, Label, FormGroup, Input, InputGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { deleteProject } from '../../../api/User/Project';
import { getProject  } from '../../../api/User/Project';
import ProjectcategoryTable from '../Table/ProjectcategoryTable';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { UserRoleContext } from '../../../Services/Context/UserRole/UserRole';
import { userRole } from '../../../api/Auth/GetToken';

const MyProject = (props) => {

  const [showTable, setShowTable] = useState(false)
  const [tableData, setTableData] = useState([])

  const navigate = useNavigate()
  


  const refreshTable = async () => {
    setShowTable(false)
    const response = await getProject()
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

  useEffect(() => {
    refreshTable()
  }, [])

  const editPro = async (id) => {
    navigate(`${process.env.PUBLIC_URL}/project/update`, {state:{id : id , update : true}})
  }

  const deletePro = async (id) => {
    const response = await deleteProject(id)
    if (response.data.isSuccess === true) {
      toast.success("delete is Success")
      refreshTable()
    }
    else if (response.data.IsSuccess === false) {
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



  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12" style={{ marginTop: "45px" }}>
            <Card >
              <CardBody>
                <Fragment >
                  <Form className="theme-form">
                    <Row style={{ marginTop: "20px" }}>
                      {
                        showTable ? <ProjectcategoryTable data={tableData} edit={editPro} deletePro={deletePro} />
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
    </Fragment>
  );
};
export default MyProject;