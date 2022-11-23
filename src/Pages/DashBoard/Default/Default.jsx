import React, { Fragment, useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Breadcrumbs from '../../../CommonElements/Breadcrumbs';
import DefaultContain from '../../../Component/DashBoard/Default/index';
import { useNavigate } from "react-router-dom"
import { UserRoleContext } from '../../../Services/Context/UserRole/UserRole';
import { userRole } from '../../../api/Auth/GetToken';

const Default = (props) => {

  const navigate = useNavigate()
  const role = useContext(UserRoleContext)

  const checkUserKind = async () => {
    const response = await userRole()

    if (response.data.isManager === true) {
      role.ChangeRole("admin")
      navigate(`${process.env.PUBLIC_URL}/admin/Category`, { replace: true })
    }
    else {
      navigate(`${process.env.PUBLIC_URL}/project/MyProject`, { replace: true })
      role.ChangeRole("user")

    }
  }
  checkUserKind()

  return (
    <Fragment>
      <Breadcrumbs parent="Dashboards" title="Default" />
      <DefaultContain />
    </Fragment>
  );
};
export default Default;