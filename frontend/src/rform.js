import React, { useState } from 'react'
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function RealForm() {
    const [values, setValues] = { name: '', email: '', password: '' }
    const validationschema = yup.Object({
        userName: yup.string().required('username is required').min(3, 'username atleast contains 3 characters'),
        userEmail: yup.string().required('useremail is required').email('enter valid email format')
        userPassword:

    })

    return (
        <div>form
            <form onSubmit={(e) => {
                e.preventDefault();
                const formElement = e.target; //get the form
                const formData = new FormData(formElement); //put it inn the form data machine
                const finalData = Object.fromEntries(formData.entries()); //extract the form package 
                console.log(finalData);

            }} >
                <label htmlFor='nameInput'>Name:</label>
                <input type='text'
                    id='nameInput'
                    name='userName' />
                <label htmlFor='emailInput'>Email:</label>
                <input type='email'
                    id='emailInput'
                    name='userEmail' />
                <label htmlFor='passwordInput'>Password:</label>
                <input type='password'
                    id='passwordInput'
                    name='userPassword' />

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default RealForm