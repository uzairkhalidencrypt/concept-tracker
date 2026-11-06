import React from 'react'

function app() {
    return (
        <div>app
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor='username'>Username:</label>
                <input name='fullname'
                    type='text' />
                <label htmlFor='useremail'>Useremail:</label>
                <input name='email'
                    type='email' />
                <label htmlFor='userage'>Userage:</label>
                <input name='age'
                    type='number' />
                <label htmlFor='usercolor'>Usercolor:</label>
                <input name='color'
                    type='color' />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default app