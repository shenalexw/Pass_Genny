import React, { useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import { VscChromeClose, VscInfo } from "react-icons/vsc";
import { GrSecure } from "react-icons/gr";
import axios from 'axios';
import Tooltip from '../../components/tooltip/Tooltip';
import './Home.css';
import SaveForm from '../../components/saveForm/SaveForm';


export default function Home({ token, identification }) {
    const [hidden, setHidden] = useState(false)
    const [toggleDisplayPassword, setDisplayPassword] = useState(true)
    const [password, setPassword] = useState({
        "recievedPassword": "Let's get Generating!",
        "previousPassword": "No Previously Generated Password"
    })
    const [length, setLength] = useState(10)
    const [number, setNumber] = useState(true)
    const [capital, setCapital] = useState(true)
    const [symbol, setSymbol] = useState(true)


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


    let saveForm;
    if (token && identification) {
        saveForm = <SaveForm token={token} identification={identification} password={(toggleDisplayPassword ? password.recievedPassword : password.previousPassword)} />;
    }

    let extraInstructions;
    if (token && identification) {
        extraInstructions = <li>Extra: You can save up to 5 passwords with an associated key</li>;
    }

    async function getPassword() {
        try {
            setDisplayPassword(true);
            const response = await axios.get("https://pass-genny.herokuapp.com/pass?length=" + length + "&number=" + number + "&capital=" + capital + "&symbol=" + symbol);
            const updatedValue = {
                recievedPassword: response.data,
                previousPassword: password.recievedPassword

            };
            setPassword(previousPassword => ({
                ...previousPassword,
                ...updatedValue
            }));
            openSnackbar('Password Generated', 2000)

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

    function handleTogglePassword() {
        if (toggleDisplayPassword) { openSnackbar('Viewing Previous Password', 2000); }
        else { openSnackbar('Viewing Current Password', 2000); }

        setDisplayPassword((prevState) => (
            !prevState
        ));
    }

    function handleHiddenChange() {
        setHidden(!hidden)
    }

    function handleCopy() {
        window.navigator.clipboard.writeText(toggleDisplayPassword ? password.recievedPassword : password.previousPassword)
            .then(() => openSnackbar('Password Copied', 2000))
    }

    function handleClear() {
        if (window.confirm("Are you sure you want to clear your password field? This will remove the current password and the previous password.") === true) {
            const updatedValue = {
                recievedPassword: "Let's get Generating!",
                previousPassword: "No Previously Generated Password"

            };
            setPassword(previousPassword => ({
                ...previousPassword,
                ...updatedValue
            }));
            openSnackbar('Password Field Clear', 2000)
        }
    }

    return (
        <div className="home">

            <div className="homeContent">

                <div className="instructions">


                    The password generator will generate a random password based off the configurations you desire!
                    <ul>
                        <li>Default length set to 10 characters, but can be adjusted by dragnumber</li>
                        <li>Configurations can be adjusted through checkboxes and dragnumber</li>
                        <li>Only the previous password to the newly generated password is accessible</li>
                        <li>Passwords can be hidden or visible based off of checkbox, copy button can be utilized when hidden</li>
                        <li>For security purposes, no dictionary words will be found in password</li>
                        <br />
                        {extraInstructions}
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
                    <div className="centerFlexBoxRow"> <label className="switch">
                        <input type="checkbox" id="hidden" name="hidden" checked={hidden} onChange={handleHiddenChange} />
                        <span className="slider round"></span>

                    </label>Hide the Password <Tooltip icon={<VscInfo size={18} />} text={"Use the Copy button to retrieve the hidden password"} /></div>
                    <br /><br />
                </form>
                <div className="generatePassword">
                    <button onClick={getPassword}>Generate Password</button>
                    <button onClick={handleTogglePassword}>Toggle Previous Password</button>
                    <button onClick={handleCopy}>Copy</button>
                    <br />
                    <br />
                    <div className="passwordBox">
                        <div className="passwordBoxRight"><GrSecure size={28} /></div>
                        <div className="passwordBoxLeft"><label className="password">{hidden ? "**********" : (toggleDisplayPassword ? password.recievedPassword : password.previousPassword)}</label></div>
                        <div className="passwordBoxRight clearBox"><VscChromeClose size={28} onClick={handleClear} /></div>
                    </div>
                    <br />
                    {saveForm}

                </div>
            </div>
        </div >
    )

}
