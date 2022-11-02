import { H5 } from '../../../AbstractElements';
import { Col, Card, CardHeader, Table  , Button} from 'reactstrap';
import React, { Fragment, useContext } from 'react';

const UserTable = (props) => {
    
  const { data } = props

  return (
    <Fragment>
      <Col sm="12">
        <Card>
          <CardHeader>
            <H5>{"User List"}</H5>
          </CardHeader>
          <div className="table-responsive">
            <Table>
               <thead>
                <tr>
                  <th scope="col">{'#'}</th>
                  <th scope="col">{'Name'}</th>
                  <th scope="col">{'Company Name'}</th>
                  <th scope="col">{'email'}</th>
                  <th scope="col">{'id'}</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item) =>
                    <tr key={item.id}>
                      <th scope="row">{item.id}</th>
                      <td>{item.fullName}</td>
                      <td>{item.companyName}</td>
                      <td>{item.email}</td>
                      <td>{item.id}</td>
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

export default UserTable;