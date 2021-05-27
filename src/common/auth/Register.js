import React, { useState } from 'react';


import Button from '@material-ui/core/Button';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';


export default function Register() {

    const [registerForm, setRegisterForm] = useState({
        id: 0,
        email_address: '',
        first_name: '',
        last_name: '',
        mobile_number: '',
        password: ''
    })

    const [regSuccess, setRegSuccess] = useState('');

    const inputChangeHandler = (e) => {
        const state = registerForm;
        state[e.target.name] = e.target.value;
        setRegisterForm({ ...state })
    }

    const onFormSubmitted = async (e) => {
        // console.log(e);
        e.preventDefault();
        try {
            const registerData = registerForm;
            const response = await fetch('/api/v1/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });
            const data = await response.json();
            if (response.ok) {
                setRegSuccess("Registration successful. Please Login!")
            } else {
                const error = new Error();
                error.message = data.message || 'Something went wrong.';
            }
            setRegisterForm({ id: 0, email_address: '', first_name: '', last_name: '', mobile_number: '', password: '' })
        } catch (error) {
            setRegSuccess(error.message);
        }
    }

    const { email_address, first_name, last_name, mobile_number, password } = registerForm;

    return (

        <ValidatorForm className="subscriber-form" onSubmit={(e) => onFormSubmitted(e)}>
            <TextValidator
                id="firstName"
                type="text"
                name="first_name"
                label="First Name*"
                value={first_name}
                className="form-input"
                onChange={inputChangeHandler}
                validators={['required']}
                errorMessages={['FirstName required']}>
            </TextValidator>

            <TextValidator
                id="lastName"
                type="text"
                name="last_name"
                label="Last Name*"
                value={last_name}
                className="form-input"
                onChange={inputChangeHandler}
                validators={['required']}
                errorMessages={['Lastname required']}>
            </TextValidator>

            <TextValidator
                id="email"
                type="email"
                name="email_address"
                label="Email*"
                value={email_address}
                className="form-input"
                onChange={inputChangeHandler}
                validators={['required', 'isEmail']}
                errorMessages={['Username required']}>
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
                errorMessages={['Enter password']}>

            </TextValidator>

            <TextValidator
                id="contactNo"
                type="text"
                name="mobile_number"
                label="Contact No*"
                value={mobile_number}
                className="form-input"
                onChange={inputChangeHandler}
                validators={['required', 'isNumber']}
                errorMessages={['Contact required']}>
            </TextValidator>

            <p>{regSuccess}</p>

            <Button type="submit" variant="contained" color="primary" className="reg-btn">Register</Button>
        </ValidatorForm>
    )
}