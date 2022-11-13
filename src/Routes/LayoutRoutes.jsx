import React, { Fragment, } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { routes } from './Routes';
import {AdminRoutes} from "./AdminRotes"
import Layout from '../Layout/Layout';
import { useState } from 'react';

const LayoutRoutes = () => {

  const [manager, setManager] = useState(async () => localStorage.setItem("manager"))

  return (
    <Fragment>
      {
        manager === "false" ? (
          <Routes>
            {routes.map(({ path, Component }, i) => (
              <Route element={<Layout />} key={i}>
                <Route path={path} element={Component} />
              </Route>
            ))}
            <Route path={`/*`} element={<Navigate to={`${process.env.PUBLIC_URL}/pages/error/error-page1`} />} />
          </Routes>
        ) : (
          <Routes>
            {AdminRoutes.map(({ path, Component }, i) => (
              <Route element={<Layout />} key={i}>
                <Route path={path} element={Component} />
              </Route>
            ))}
            <Route path={`/*`} element={<Navigate to={`${process.env.PUBLIC_URL}/pages/error/error-page1`} />} />
          </Routes>
        )
      }
    </Fragment >
  );
};

export default LayoutRoutes;