import React, {Fragment, useState} from 'react';

import Button from '@material-ui/core/Button';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';


export default function Login() {

    const [loginForm, setLoginForm] = useState({
        id: 0,
        userName: '',
        password: ''
    })

    const onFormSubmitted = (e) => {
        // console.log(e);
        // e.preventDefault();
        // props.addSubscriberHandler(addSubscriberForm);
        // setAddSubscriberForm({ id: 0, name: '', phone: ' ' });
        // history.push("/");
    }

    const loginInputChangeHandler = (e) => {
        // const state = addSubscriberForm;
        // state[e.target.name] = e.target.value;
        // setAddSubscriberForm({ ...state})
    }

    return (
        <p>
            <ValidatorForm className="subscriber-form" onSubmit={(e) =>onFormSubmitted(e)}>
                <TextValidator
                    id="email"
                    type="email"
                    name="username" 
                    label="Username*"
                    className="form-input"
                    onChange={loginInputChangeHandler}
                    validators={['required']}
                    errorMessages={['Username required']}>
                </TextValidator>

                <TextValidator
                    id="pass"
                    type="password"
                    label="Password*"
                    name="password"
                    className="form-input"
                    onChange={loginInputChangeHandler}
                    validators={['required', 'isNumber']}
                    errorMessages={['Enter password']}>

                </TextValidator>

                <Button type="submit" variant="contained" color="primary" className="login-btn">Login</Button>
            </ValidatorForm>

        </p>
    )
}