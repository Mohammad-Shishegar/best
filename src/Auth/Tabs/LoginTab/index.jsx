import React, { Fragment, useState, useEffect } from 'react';
import { Form, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import { Btn, H5, UL } from '../../../AbstractElements';
import { EmailAddress, LoginWithJWT, Password, SignIn } from '../../../Constant';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { firebase_app, Jwt_token } from '../../../Config/Config';
import man from '../../../assets/images/dashboard/1.png';
import { handleResponse } from '../../../Services/Fack.Backend';
import FormHeader from './FormHeader';
import FormPassword from './FormPassword';
import SignInWith from './SignInWith';
import getToken from '../../../api/Auth/GetToken';


const LoginTab = ({ selected }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false);
    const navigate = useNavigate();
    const [disableBtn, setDisableBtn] = useState(false)

    const [value, setValue] = useState(
        localStorage.getItem('profileURL' || man)
    );
    const [name, setName] = useState(
        localStorage.getItem('Name')
    );

    const login = async () => {
        setDisableBtn(true)
        setLoading(true)
        if (email != "" && password != "") {
            const tokenData = await getToken(email, password)
            if (tokenData !== "404") {
                await localStorage.setItem("Name", tokenData.data.dispaly_name)
                await localStorage.setItem("token", tokenData.data.access_token)
                await localStorage.setItem("login" , true)
                toast.success('You have successfully login')
                setTimeout(() => {
                    navigate(`${process.env.PUBLIC_URL}/dashboard` , {replace:true})
                    // window.location = "/"
                }, 2000)
            }
            else
                toast.error("email or password is incorrect")
        }
        else {
            toast.warning('Please fill paramter')
        }
        setDisableBtn(false)
        setLoading(false)
    }

    // useEffect(() => {
    //     localStorage.setItem('profileURL', value);
    //     localStorage.setItem('Name', name);
    // }, [value, name]);

    const loginAuth = async (e) => {
        // e.preventDefault();
        // setLoading(true);
        // setValue(man);
        // setName('Emay Walter');
        // setEmail('test@gmail.com');
        // setPassword('test123');
        // try {
        //     await firebase_app.auth().signInWithEmailAndPassword(email, password).then(function () {
        //         setValue(man);
        //         setName('Emay Walter');
        //         setTimeout(() => {
        //             history(`${process.env.PUBLIC_URL}/dashboard/default`);
        //         }, 200);
        //     });
        // } catch (error) {
        //     setTimeout(() => {
        //         toast.error('Oppss.. The password is invalid or the user does not have a password.');
        //     }, 200);
        // }
    };
    const loginWithJwt = (e) => {
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: ({ email, password })
        // };

        // return fetch('/users/authenticate', requestOptions)
        //     .then(handleResponse)
        //     .then(user => {
        //         setValue(man);
        //         setName('Emay Walter');
        //         localStorage.setItem('token', Jwt_token);
        //         window.location.href = `${process.env.PUBLIC_URL}/dashboard/default/`;
        //         return user;
        //     });
    };
    return (
        <Fragment>
            <Form className="theme-form login-form">
                <FormHeader selected={selected} />
                <FormGroup>
                    <Label>{EmailAddress}</Label>
                    <InputGroup>
                        <InputGroupText><i className='icon-email'></i></InputGroupText>
                        <Input className="form-control" type="email" required="" onChange={e => {
                            if ((/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(e.target.value))
                                setEmail(e.target.value)
                            else
                                setEmail("")
                        }} defaultValue={email} placeholder="Email" />
                    </InputGroup>
                    <p style={email ? { color: "red", display: "none" } : { color: "red" }}>Please insert correct email format</p>
                </FormGroup>
                <FormGroup style={email ? {} : { marginTop: "-20px" }}>
                    <Label>{Password}</Label>
                    <InputGroup>
                        <InputGroupText><i className='icon-lock'></i></InputGroupText>
                        <Input className="form-control" type={togglePassword ? 'text' : 'password'} onChange={e => setPassword(e.target.value)} defaultValue={password} required="" placeholder='Password' />
                        <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? '' : 'show'}></span></div>
                    </InputGroup>
                </FormGroup>
                <FormPassword />
                <FormGroup>
                    <Btn attrBtn={{ color: 'primary', className: 'btn-block', disabled: disableBtn, onClick: (e) => login() }} >{loading ? 'LOADING...' : SignIn}</Btn>
                </FormGroup><SignInWith />
            </Form>
        </Fragment>
    );
};

export default LoginTab;