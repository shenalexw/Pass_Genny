import React, { useState } from 'react';
import axios from 'axios';
import './Home.css'

export default function Home() {
    const [hidden, setHidden] = useState(false)
    const [toggleDisplayPassword, setDisplayPassword] = useState(true)
    const [password, setPassword] = useState({
        "recievedPassword": "Let's get Generating!",
        "previousPassword": "No Previously Generated Password"
    })
    // const [previousPassword, setPreviousPassword] = useState("")
    const [length, setLength] = useState(10)
    const [number, setNumber] = useState(true)
    const [capital, setCapital] = useState(true)
    const [symbol, setSymbol] = useState(true)



    async function getPassword() {
        try {
            setDisplayPassword(true);
            const response = await axios.get("http://localhost:4000/pass?length=" + length + "&number=" + number + "&capital=" + capital + "&symbol=" + symbol);
            const updatedValue = {
                recievedPassword: response.data,
                previousPassword: password.recievedPassword

            };
            setPassword(previousPassword => ({
                ...previousPassword,
                ...updatedValue
            }));
            alert("Password Generated!");
        } catch (error) {
            console.error(error);
        }
    }

    function handleLengthChange(event) {
        setLength(event.target.value)
    }

    function handleNumberChange() {
        setNumber(!number);
    }

    function handleCapitalChange() {
        setCapital(!capital);
    }

    function handleSymbolChange() {
        setSymbol(!symbol);
    }

    function handleToggleFalse() {
        setDisplayPassword(false);
    }

    function handleHiddenChange() {
        setHidden(!hidden)
    }

    function handleCopy() {
        window.navigator.clipboard.writeText(toggleDisplayPassword ? password.recievedPassword : password.previousPassword)
            .then(() => alert("Password Copied to Clipboard"))
    }



    return (
        <div className="home">
            <div>
                <div className="instructions">
                    The password generator will generate a random password based off the configurations you desire!
                    <ul>
                        <li>Default length set to 10 characters, but can be adjusted by dragnumber</li>
                        <li>Configurations can be adjusted through checkboxes and dragnumber</li>
                        <li>Only the previous password to the newly generated password is accessible</li>
                        <li>Passwords can be hidden or visible based off of checkbox, copy button can be utilized when hidden</li>
                        <li>For security purposes, no dictionary words will be found in password</li>
                    </ul>
                </div>
                <form className="configurations" onSubmit={e => e.preventDefault()} >
                    <label>Length: </label>
                    <input id="dragnumber" min="0" max="30" step="1" value={length} type="range" onChange={handleLengthChange} />
                    <label> {length}</label>
                    <br /><br />
                    <input type="checkbox" id="number" name="number" checked={number} onChange={handleNumberChange} />
                    <label>Allow Number</label><br />
                    <input type="checkbox" id="capital" name="capital" checked={capital} onChange={handleCapitalChange} />
                    <label>Allow Capital Letters</label><br />
                    <input type="checkbox" id="symbol" name="symbol" checked={symbol} onChange={handleSymbolChange} />
                    <label>Allow Symbol</label><br /><br />
                    <br />
                    <input type="checkbox" id="hidden" name="hidden" checked={hidden} onChange={handleHiddenChange} />
                    <label>Hide Password</label><br /><br />
                </form>
                <div className="generatePassword">
                    <button onClick={getPassword}>Click To Generate Password</button>
                    <button onClick={handleToggleFalse}>Display Previous Password</button>
                    <br />
                    <br />
                    <div className="passwordBox">
                        <label className="password">{hidden ? "**********" : (toggleDisplayPassword ? password.recievedPassword : password.previousPassword)}</label>
                    </div>
                    <br />
                    <button onClick={handleCopy}>Copy</button>
                    <br />

                </div>
            </div>
        </div>
    )

}
