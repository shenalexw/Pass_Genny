import React, { useState } from 'react';
import axios from 'axios';
import './Home.css'

export default function Home() {
    const [password, setPassword] = useState("")
    const [length, setLength] = useState(10)
    const [number, setNumber] = useState(true)
    const [capital, setCapital] = useState(true)
    const [symbol, setSymbol] = useState(true)



    async function getPassword() {
        try {
            const response = await axios.get("http://localhost:4000/pass?length=" + length + "&number=" + number + "&capital=" + capital + "&symbol=" + symbol);
            setPassword(response.data)
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



    return (
        <div className="home">
            <div>
                <div className="instructions">
                    The password generator will generate a random password based off the configurations you desire
                    <ul>
                        <li>Default length set to 10 characters</li>
                        <li>All Configurations are allowed</li>
                        <li>For security purposes, no dictionary words will be found in password</li>
                    </ul>
                </div>
                <form className="configurations" onSubmit={e => e.preventDefault()} >
                    <label>Lenght: </label>
                    <input id="dragnumber" min="0" max="30" step="1" value={length} type="range" onChange={handleLengthChange} />
                    <label> {length}</label>
                    <br /><br />
                    <input type="checkbox" id="number" name="number" checked={number} onChange={handleNumberChange} />
                    <label>Allow Number</label><br />
                    <input type="checkbox" id="capital" name="capital" checked={capital} onChange={handleCapitalChange} />
                    <label>Allow Capital Letters</label><br />
                    <input type="checkbox" id="symbol" name="symbol" checked={symbol} onChange={handleSymbolChange} />
                    <label>Allow Symbol</label><br /><br />
                </form>
                <div className="generatePassword">
                    <button onClick={getPassword}>Click me to see a password</button>
                    <br />
                    <br />
                    <div className="passwordBox">
                        <label className="password">{password}</label>
                    </div>
                </div>
            </div>
        </div>
    )

}
