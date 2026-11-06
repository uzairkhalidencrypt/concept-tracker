import React from 'react'

function Form() {
    return (
        <div>form
            <form >
                <label htmlFor='nameInput'>Name:</label>
                <input type='text'
                    id='nameInput'
                    name='userName' />
                <label htmlFor='emailInput'>Email:</label>
                <input type='email'
                    id='emailInput'
                    name='userEmail' />

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Form