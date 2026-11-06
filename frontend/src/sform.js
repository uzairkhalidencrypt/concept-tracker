import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function RealForm() {
    const [values, setValues] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState("");

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
                    name='userName'
                    value={values.userName}
                    onChange={(e) => {
                        setValues({ ...values, userName: e.target.value });
                        if (values.length < 3) {
                            setError("Must be 3 chars");
                        } else {
                            setError("");
                        }
                    }}
                />
                <label htmlFor='emailInput'>Email:</label>
                <input type='email'
                    id='emailInput'
                    name='userEmail'
                    value={values.userEmail}
                    onChange={(e) => {
                        setValues({ ...values, userEmail: e.target.value });
                        if (!e.target.value.includes("@")) {
                            setError("Must be valid email");
                        }
                    }}
                />
                <label htmlFor='passwordInput'>Password:</label>
                <input type='password'
                    id='passwordInput'
                    name='userPassword'
                    value={values.password}
                    onChange={(e) => {
                        setValues({ ...values, userPassword: e.target.value });
                        if (values.length < 8) {
                            setError("Must be 8 chars");
                        } else {
                            setError("");
                        }
                    }} />

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default RealForm