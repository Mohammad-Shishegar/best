import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Breadcrumbs from '../../../CommonElements/Breadcrumbs';
import DefaultContain from '../../../Component/DashBoard/Default/index';
import { useNavigate } from "react-router-dom"

const Default = (props) => {

  const navigate = useNavigate()

  const checkUserKind = async () => {

    const manager = await localStorage.getItem("manager")
    if (manager === "true")
      navigate(`${process.env.PUBLIC_URL}/admin/Category`, { replace: true })
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