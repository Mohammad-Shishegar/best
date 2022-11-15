import React, { Fragment, useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Breadcrumbs from '../../../CommonElements/Breadcrumbs';
import DefaultContain from '../../../Component/DashBoard/Default/index';
import { useNavigate } from "react-router-dom"
import { UserRoleContext } from '../../../Services/Context/UserRole/UserRole';

const Default = (props) => {

  const navigate = useNavigate()
  const role = useContext(UserRoleContext)

  const checkUserKind = async () => {

    const manager = await localStorage.getItem("manager")
    if (manager === "true") {
      role.ChangeRole("admin")
      navigate(`${process.env.PUBLIC_URL}/admin/Category`, { replace: true })
    }
    else
      role.ChangeRole("user")

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