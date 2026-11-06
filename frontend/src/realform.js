import React, { useState } from 'react';

function RealTimeForm() {

    const [email, setEmail] = useState("");

    const [error, setError] = useState("");

    function handleChange(e) {
        const newValue = e.target.value;


        setEmail(newValue);


        if (newValue.length > 0 && !newValue.includes("@")) {
            setError("Must include @");
        } else {
            setError("");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (error) return;
        console.log("REAL-TIME FORM DATA:", { email: email });
    }

    return (
        <div >
            <h2>Form 2: Real-Time</h2>
            <form onSubmit={handleSubmit}>
                <label>Email: </label>

                <input
                    type="text"
                    value={email}
                    onChange={handleChange}
                />

                {error && <p >{error}</p>}

                <button type="submit">Submit</button>
            </form>
            <p>The error updates instantly as you type.</p>
        </div>
    );
}

export default RealTimeForm;