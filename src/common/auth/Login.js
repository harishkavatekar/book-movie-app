import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';


export default function Login() {

    const [loginForm, setLoginForm] = useState({
        userName: '',
        password: ''
    })

    const onFormSubmitted = async (e) => {
        console.log(e);
        e.preventDefault();

        try {

            const { userName, password } = loginForm;
            const authorizedToken = window.btoa(`${userName}:${password}`);

            const response = await fetch('/api/v1/auth/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Basic ${authorizedToken}`
                }
            })

            const result = await response.json();
            const token = response.headers.get('access-token');

            if (response.ok) {
                sessionStorage.setItem('user-detail', JSON.stringify(result));
                sessionStorage.setItem('token', token);
                window.location = '/';
            } else {
                const error = new Error();
                error.message = result.message || 'Something went wrong.';
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }

    const inputChangeHandler = (e) => {
        const state = loginForm;
        state[e.target.name] = e.target.value;
        setLoginForm({ ...state })
    }

    const { userName, password } = loginForm;

    return (
        <ValidatorForm className="subscriber-form" onSubmit={(e) => onFormSubmitted(e)}>
            <TextValidator
                id="username"
                type="text"
                name="userName"
                label="Username*"
                value={userName}
                className="form-input"
                onChange={inputChangeHandler}
                validators={['required']}
                errorMessages={['Username required']}
            >
            </TextValidator>

            <TextValidator
                id="password"
                type="password"
                label="Password*"
                name="password"
                value={password}
                className="form-input"
                onChange={inputChangeHandler}
                validators={['required']}
                errorMessages={['Enter password']}
            >
            </TextValidator>

            <Button type="submit" variant="contained" color="primary" className="login-btn">Login</Button>
        </ValidatorForm>
    )
}