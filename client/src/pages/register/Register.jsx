import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'react-simple-snackbar';
import axios from 'axios';
import '../login/Login.css'

export default function Login({ setToken, setIdentification }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    // snackbar
    const options = {
        style: {
            backgroundColor: '#4CAF50',
            color: 'white',
            fontSize: '15px',
            textAlign: 'center',
        },
        closeStyle: {
            color: 'white',
            fontSize: '20px',
        },
    }
    const [openSnackbar] = useSnackbar(options)

    const errorOptions = {
        style: {
            backgroundColor: 'red',
            color: 'white',
            fontSize: '15px',
            textAlign: 'center',
        },
        closeStyle: {
            color: 'white',
            fontSize: '20px',
        },
    }
    const [errorSnackbar] = useSnackbar(errorOptions)
    let navigate = useNavigate();

    async function registerUser(credentials) {
        axios.post("https://pass-genny.herokuapp.com/register", credentials)
            .then(function (response) {
                let token = response.data["token"];
                let identification = response.data["identification"];
                if (!token || !identification) {
                    errorSnackbar("User Exists or Invalid Entry", 2000);
                } else {
                    setToken(token);
                    setIdentification(identification);
                    openSnackbar("Welcome To Password Genny!", 2000);
                    navigate("../", { replace: true });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (hasWhiteSpace(username) || hasWhiteSpace(password)) { return errorSnackbar("Blank Space Found in Username or Password", 2000); }
        if (username.length < 4 || password.length < 4) { return errorSnackbar("Username and Password much be longer than 4 characters", 2000); }
        registerUser({
            username,
            password
        });
    }

    return (
        <div className="login">
            <div className="loginBox">
                <form onSubmit={handleSubmit}>
                    <div className="loginSubmitBox">
                        <h2>Register User</h2>
                    </div>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={e => setUserName(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <div className="loginSubmitBox">
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
    setIdentification: PropTypes.func.isRequired
}
