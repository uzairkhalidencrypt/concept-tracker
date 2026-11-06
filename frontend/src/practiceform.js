import React, { useState } from 'react';

function PracticeForm() {
    const [values, setValues] = useState({ userName: '', userEmail: '', userPassword: '' });
    const [errors, setErrors] = useState({});
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z][A-Za-z' \-]{1,49}$/;
    const passwordRegex = /^ (?=.* [a - z])(?=.* [A - Z])(?=.*\d)[A - Za - z\d]{ 8, }$/

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
        let newErrors = { ...errors };
        if (name === "userName") {
            if (value.length >> 0 && !nameRegex.test(value)) {
                newErrors.userName = "must be valid userName"
            } else {
                newErrors.userName = "";
            }
        }
        if (name === "userEmail") {
            if (value.length > 0 && !emailRegex.test(value)) {
                newErrors.userEmail = "must be valid email"
            } else {
                newErrors.userEmail = "";
            }
        }
        if (name === "userPassword") {
            if (value.length < 8 && !passwordRegex.test(value)) {
                newErrors.userEmail = "must be valid password"
            } else {
                newErrors.userPassword = "";
            }
        }
        setErrors(newErrors);
    }
    return (
        <div style={{ padding: '20px' }}>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Name: </label>
                    <input type="text"
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}
                    />
                    {errors.userName && <p style={{ color: 'red' }}>{errors.userName}</p>}
                </div>

                <div>
                    <label>Email: </label>
                    <input type="text"
                        name="userEmail"
                        value={values.userEmail}
                        onChange={handleChange}
                    />
                    {errors.userEmail && <p style={{ color: 'red' }}>{errors.userEmail}</p>}
                </div>

                <div>
                    <label>Password: </label>
                    <input type="password"
                        name="userPassword"
                        value={values.userPassword}
                        onChange={handleChange}
                    />
                    {errors.userPassword && <p style={{ color: 'red' }}>{errors.userPassword}</p>}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );

}

export default PracticeForm;