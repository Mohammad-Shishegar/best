import React, { Fragment } from 'react';
import { useState } from 'react';
import { Lock, Mail, User } from 'react-feather';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, InputGroup, Label } from 'reactstrap';
import { Btn, H4, H5, H6, LI, P, UL } from '../../../AbstractElements';
import { CreateAccount, EmailAddress, Password, PrivacyPolicy, SignIn, YourName } from '../../../Constant';
import { FaceBookSVG, GoogleSVG, InstagramSVG, TwitterSVG } from '../../../Data/svgIcons';
import reagisterUser from "../../../api/Auth/Register"
import getToken from "../../../api/Auth/GetToken"
import { useNavigate } from "react-router-dom"
import { useContext } from 'react';
import { UserRoleContext } from '../../../Services/Context/UserRole/UserRole';

const RegisterFrom = (props) => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        password: "",
        userName: ""
    })

    const [disableBtn, setDisableBtn] = useState(true)

    const [showPass, setShowPass] = useState(true)

    const [loading, setLoading] = useState(false)

    const role = useContext(UserRoleContext)

    const registerUser = async () => {
        setDisableBtn(true)
        setLoading(true)
        if (userData.password !== "" && userData.email !== "" && userData.fullName !== "") {
            const response = await reagisterUser(userData)
            if (response === "false") {
                toast.error('User Registered')
                setDisableBtn(false)
                setLoading(false)
                return
            }
            const tokenData = await getToken(userData.userName, userData.password)
            await localStorage.setItem("Name", response.data.data.fullName)
            await localStorage.setItem("token", tokenData.data.access_token)
            await localStorage.setItem("manager", tokenData.data.manager)
            if (tokenData.data.manager === "true")
                role.ChangeRole("admin")
            else
                role.ChangeRole("user")
            toast.success('You have successfully registered')
            setTimeout(() => {
                navigate(`${process.env.PUBLIC_URL}/dashboard/`, { replace: true })
                // window.location = "/"
            }, 2000)
        }
        else {
            toast.warning('Please fill paramter')
        }
        setDisableBtn(false)
        setLoading(false)
    }

    return (
        <Fragment>
            <Form className="theme-form login-form">
                <div className="login-header text-center">
                    <H4>Create your account</H4>
                    <H6>Enter your personal details to create account</H6>
                </div>
                {/* <FormGroup>
                    <UL attrUL={{ className: 'simple-list login-social flex-row' }}>
                        <LI><a href="https://www.google.com/" >
                            <GoogleSVG />
                        </a></LI>
                        <LI><a href="https://twitter.com/" >
                            <TwitterSVG />
                        </a></LI>
                        <LI><a href="https://www.instagram.com/" >
                            <InstagramSVG />
                        </a></LI>
                        <LI><a href="https://www.facebook.com/" >
                            <FaceBookSVG />
                        </a></LI>
                    </UL>
                </FormGroup> */}
                <div className="login-social-title">
                    <H5>Sign in with Email</H5>
                </div>
                <FormGroup className="form-group">
                    <Label>{YourName}</Label>
                    <div className="small-group">
                        <InputGroup><span className="input-group-text"><User /></span>
                            <Input className="form-control" type="text" required="" placeholder="Fist Name" onChange={(txt) => {
                                setUserData({ ...userData, fullName: txt.target.value })
                            }} />
                        </InputGroup>
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label>{EmailAddress}</Label>
                    <InputGroup><span className="input-group-text"><Mail /></span>
                        <Input className="form-control" type="email" required="" placeholder="Test@gmail.com" onChange={(txt) => {
                            if ((/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(txt.target.value))
                                setUserData({ ...userData, email: txt.target.value, userName: txt.target.value })
                            else
                                setUserData({ ...userData, email: "", userName: "" })
                        }} />
                    </InputGroup>
                    <p style={userData.email ? { color: "red", marginTop: "10px", display: "none" } : { color: "red", marginTop: "10px" }}>Please insert correct email format</p>
                </FormGroup>
                <FormGroup>
                    <Label>{Password}</Label>
                    <InputGroup><span className="input-group-text"><Lock /></span>
                        <Input className="form-control" type={showPass ? "password" : "text"} name="login[password]" required="" placeholder="*********" onChange={(txt) => {
                            setUserData({ ...userData, password: txt.target.value })
                        }} />
                        <div className="show-hide" onClick={() => { setShowPass(!showPass) }}><span className="show"></span></div>
                    </InputGroup>
                </FormGroup>
                <FormGroup className="form-group">
                    <div className="checkbox">
                        <Input id="checkbox1" type="checkbox" onClick={() => setDisableBtn(!disableBtn)} />
                        <Label className="text-muted" for="checkbox1">Agree with <Link to={`${process.env.PUBLIC_URL}/pages/Privacy-Policy`}><span>{PrivacyPolicy}</span></Link> </Label>
                    </div>
                </FormGroup>
                <FormGroup>
                    <Btn attrBtn={{ disabled: disableBtn, className: 'btn-block', color: 'primary', onClick: () => { registerUser() } }}
                    >{(loading) ? "Loading..." : CreateAccount}</Btn>
                </FormGroup>
                <P>Already have an account?
                    <Link to={`${process.env.PUBLIC_URL}/pages/authentication/login`} className="ms-2">
                        {SignIn}
                    </Link>
                </P>
            </Form>
        </Fragment>
    );
};

export default RegisterFrom;