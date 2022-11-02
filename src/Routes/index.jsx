import React, { Fragment, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { firebase_app, auth0, Jwt_token } from '../Config/Config';
import { configureFakeBackend, authHeader, handleResponse, } from '../Services/Fack.Backend';
import Loader from '../Layout/Loader';
import LayoutRoutes from './LayoutRoutes';
import Callback from '../Auth/Callback';
import { authRoutes } from './AuthRoutes';
import PrivateRoute from './PrivateRoute';
import Signin from '../Auth/Signin'
import Default from '../Pages/DashBoard/Default/Default';
import Layout from '../Layout/Layout';

configureFakeBackend();
const Routers = () => {
  var token
  const [currentUser, setCurrentUser] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [login, setLogin] = useState();
  // const jwt_token = localStorage.getItem('token')};

  const [jwt_token, setJwt_token] = useState(async ()=> await localStorage.getItem('token'))
  const getToken = async () => {
     token = await localStorage.getItem('token')
    var login = await localStorage.getItem('login')
    // setJwt_token(token)
    setLogin(login)
  }

  getToken()

  useEffect(() => {
    getToken()
  }, [])

  useEffect(() => {
    let abortController = new AbortController();
    const requestOptions = { method: 'GET', headers: authHeader() };
    fetch('/users', requestOptions).then(handleResponse);
    firebase_app.auth().onAuthStateChanged(setCurrentUser);
    // setAuthenticated(JSON.parse(localStorage.getItem('authenticated')));
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    console.disableYellowBox = true;
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Fragment>
      <Auth0Provider domain={auth0.domain} clientId={auth0.clientId} redirectUri={auth0.redirectUri}>
        <HashRouter basename={'/'}>
          <>
            <Suspense fallback={<Loader />}>
              <Routes>

                <Route element={<Layout />}>
                  <Route path={Jwt_token ? `${process.env.PUBLIC_URL}/dashboard/default/` : ""} element={ Jwt_token ? <Default /> : <Navigate to={`${process.env.PUBLIC_URL}/pages/intro`} />} />
                </Route>


                <Route path={'/'} element={<PrivateRoute />}>
                  {(currentUser !== null || authenticated || jwt_token) ?
                    <>

                      <Route element={<Layout />}>
                        <Route path={`${process.env.PUBLIC_URL}/dashboard/default/`} element={<Default />} />
                      </Route>


                      <Route path={`/*`} element={<LayoutRoutes />} />
                      <Route exact
                        path={`${process.env.PUBLIC_URL}`}
                        element={<Navigate to={`${process.env.PUBLIC_URL}/pages/intro`} />}

                      // element={<Navigate to={`${process.env.PUBLIC_URL}/pages/intro`} />}
                      />
                      <Route exact
                        path={`/`}
                        element={<Navigate to={`${process.env.PUBLIC_URL}/pages/intro`} />}
                      // element={<Navigate to={`${process.env.PUBLIC_URL}/pages/intro`} />}
                      />
                    </> : ""
                    // <>
                    //   <Route exact
                    //     path={`${process.env.PUBLIC_URL}`}
                    //     // element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/default`} />}
                    //     element={<Navigate to={`${process.env.PUBLIC_URL}/pages/intro`} />}
                    //   />
                    //   <Route exact
                    //     path={`/*`}
                    //     // element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/default`} />}
                    //     element={<Navigate to={`${process.env.PUBLIC_URL}/pages/intro`} />}
                    //   />
                    // </>
                  }

                  {currentUser !== null || authenticated || jwt_token ?
                    <>
                      <Route path={`/*`} element={<LayoutRoutes />} />
                    </>
                    : ""
                    // : <Route path={`/*`} element={<Navigate to={`${process.env.PUBLIC_URL}/pages/authentication/login`} />} />
                  }


                </Route>
                <Route path={`${process.env.PUBLIC_URL}/callback`} render={() => <Callback />} />
                <Route exact path={`${process.env.PUBLIC_URL}/pages/authentication/login`} element={<Signin />} />
                {authRoutes.map(({ path, Component }, i) => (
                  <Route path={path} element={Component} key={i} />
                ))}
                {/* <Route path={`/*`} element={<Navigate to={`${process.env.PUBLIC_URL}/pages/error/error-page1`} />} /> */}
              </Routes>
            </Suspense>
          </>
        </HashRouter>
      </Auth0Provider>
    </Fragment >
  );
};
export default Routers;