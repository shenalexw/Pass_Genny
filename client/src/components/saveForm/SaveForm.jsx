import React, { useState } from 'react';
import "./SaveForm.css";
import axios from 'axios';
import { useSnackbar } from 'react-simple-snackbar';

export default function SaveForm({ token, identification, password }) {
    const [key, setKey] = useState();
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

    async function savePassword(identification, token, credentials) {
        axios.post("https://pass-genny.herokuapp.com/pass/users/" + identification + "?access_token=" + token, credentials)
            .then(function (response) {
                if (response.data) {
                    openSnackbar("Password Saved", 2000);
                    const keyInput = document.getElementById('key');
                    keyInput.value = '';
                } else {
                    errorSnackbar("Password Not Saved", 2000);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSaveForm = async e => {
        e.preventDefault();
        if (password === 'No Previously Generated Password' || password === "Let's get Generating!") { errorSnackbar("Not an Acceptable Password", 2000); return }
        savePassword(
            identification,
            token
            , {
                key,
                password
            });
    }

    function handleKeyChange(event) {
        setKey(event.target.value.trim())
    }

    return (
        <div className="saveForm" onSubmit={handleSaveForm}>
            <form>
                <input type="text" id="key" name="key" placeholder='key' maxLength="30" onChange={handleKeyChange} />
                <button onClick={handleSaveForm}>Save</button>
            </form>
        </div>
    )
}
