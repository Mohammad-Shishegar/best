import React, { Fragment } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { ForgotPassword, RememberPassword } from '../../../Constant';
import {Link} from "react-router-dom"

const FormPassword = () => {
    return (
        <Fragment>
            <FormGroup className="login-btn">
                <div className="checkbox">
                    <Input id="checkbox1" type="checkbox" />
                    <Label for="checkbox1">{RememberPassword}</Label>
                </div>
                <Link className="link" to={`${process.env.PUBLIC_URL}/pages/authentication/forget-pwd`}>{ForgotPassword}</Link>
            </FormGroup>
        </Fragment>
    );
};
export default FormPassword;