import React, { useState } from 'react'

export default function Login() {

    const [modalDisplaying, setModalDisplaying] = useState(false);

    const modalOverlay = modalDisplaying ?
        <div className="modalOverlay">
            <div className="modalContent" id="createAccountBox">
                <form id="createAccountForm">
                    <span id="x-icon" onClick={() => setModalDisplaying(false)}>&#10006;</span>
                    <h3>Enter your user information to create an account: </h3>
                    <input className="input1" type="text" name="username" placeholder="Username" />
                    {/* {{!-- <input class="input1" type="password" name="password" placeholder="Password"> --}} */}
                    {/* {{#formValidationMessage}}
<p>{{formValidationMessage}}</p>
{{/formValidationMessage}} */}
                    <button id="createAccountSubmitBtn" className="btn3">Create Account</button>
                </form>
            </div>
        </div> : null;

    return (
        <>
            <link rel="stylesheet" href="/css/login.css" />
            <link rel="stylesheet" href="/css/createAccount.css" />

            {/* {{#message}}
<p>{{message}}</p>
{{/message}} */}

            <form id="loginForm" method="POST">
                <div>
                    <label htmlFor="username">Name: </label>
                    <input type="text" name="username" /> <br />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" />
                </div>
                <button>Enter</button>
            </form>

            <p id="createAccountCTA">Don't have an account? 
            <span id="createAccountBtn" onClick={() => {
                setModalDisplaying(true)
                console.log(modalDisplaying);
            }
                }> Create one </span>
            today.</p>

            {modalOverlay}

        </>
    )
}
