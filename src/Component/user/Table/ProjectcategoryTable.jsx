
import { H5 } from '../../../AbstractElements';
import { Col, Card, CardHeader, Table  , Button} from 'reactstrap';
import { Lock, Mail, User , Trash , Edit } from 'react-feather';
import React, { Fragment, useContext } from 'react';

const ProjectcategoryTable = (props) => {
    
  const { data , edit , deletePro } = props

  return (
    <Fragment>
      <Col sm="12">
        <Card>
          <CardHeader>
            <H5>{"Project List"}</H5>
          </CardHeader>
          <div className="table-responsive">
            <Table>
              <thead>
                <tr>
                  {/* <th scope="col">{'#'}</th> */}
                  <th scope="col">{'Title'}</th>
                  <th scope="col">{'day'}</th>
                  <th scope="col">{'budget'}</th>
                  <th scope="col">{'edit'}</th>
                  <th scope="col">{'delete'}</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item) =>
                    <tr key={item.id}>
                      {/* <th scope="row">{item.id}</th> */}
                      <td>{item.title}</td>
                      <td>{item.day+""}</td>
                      <td>{item.budget}</td>
                      <td>{<Button color="primary" outline onClick={()=>edit(item.id)}> <Edit size={20}/> </Button>}</td>
                      <td>{<Button color="danger" outline onClick={()=>deletePro(item.id)}> <Trash size={20}/> </Button>}</td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
          </div>
        </Card>
      </Col>
    </Fragment>
  );
};

export default ProjectcategoryTable;