import React, { useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import axios from 'axios';
import "./View.css";

export default function View({ token, identification }) {
    const [data, setData] = useState([]);
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
    const [openSnackbar] = useSnackbar(options);
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
    const [errorSnackbar] = useSnackbar(errorOptions);

    async function getPasswords(identification, token) {
        try {
            const response = await axios.get("https://pass-genny.herokuapp.com/pass/users/" + identification + "?access_token=" + token);
            if (response.data.length === 0) { return errorSnackbar("No Data Found", 2000) };
            setData(response.data);
            openSnackbar("Table Loaded", 2000);
        } catch (error) {
            errorSnackbar("Unable to get Passwords", 2000);
            console.error(error);
        }
    };

    const refreshTable = async () => {
        try {
            const response = await axios.get("https://pass-genny.herokuapp.com/pass/users/" + identification + "?access_token=" + token);
            setData(response.data);
        } catch (error) {
            errorSnackbar("Unable to get Passwords", 2000);
            console.error(error);
        }
    }
    async function deletePassword(key, identification, token) {
        axios.delete("https://pass-genny.herokuapp.com/pass/users/" + identification + "?access_token=" + token + "&key=" + key)
            .then(function (response) {
                if (response) {
                    refreshTable();
                    openSnackbar("Password Deleted", 2000);
                } else {
                    errorSnackbar("Password Not Deleted", 2000);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function updatePassword(identification, token, credentials) {
        axios.put("https://pass-genny.herokuapp.com/pass/users/" + identification + "?access_token=" + token, credentials)
            .then(function (response) {
                if (response.data) {
                    openSnackbar("Key updated", 2000);
                } else {
                    errorSnackbar("Unable to Update Key", 2000);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function handleRefresh() {
        getPasswords(identification, token);
    }

    function handleChange(e, index) {
        const clonedData = [...data];
        clonedData[index]["key"] = e.target.value;
        setData(clonedData);
    }

    function handleDelete(key) {
        if (window.confirm("Are you sure you want to delete this password? This action is not reversible.")) {
            deletePassword(key, identification, token);
        }
    }

    function handleUpdate(id) {
        if (window.confirm("Are you sure you want to update this key?")) {
            const newKey = data[id]["key"].trim();
            const newPassword = data[id]["password"];
            if (newKey === '') { return errorSnackbar("Blank Key Not Accepted", 2000); }
            updatePassword(identification, token, { "id": id, "key": newKey, "password": newPassword })
        }
    }

    let tableRows = data.map((data, id) => {
        return <tr key={id}>
            <td className="otherCell"><input autoComplete="false" maxLength="30" className="inputKey" type="text" name="key" value={data.key} onChange={e => handleChange(e, id)} /></td>
            <td className="otherCell">{data.password}</td>
            <td className="buttonCell"><button onClick={() => handleUpdate(id)}>Update</button></td>
            <td className="buttonCell"><button onClick={() => handleDelete(data.key)}>Delete</button></td>
        </tr>
    })

    return (
        <div className="view">
            <div className="viewContent">
                <div className="instructions">
                    Table displaying all passwords associated with your account.
                    <ul>
                        <li>Only 5 Passwords can be created</li>
                        <li>Make changes to edit and click the update button to save changes</li>
                        <li>Entries may be deleted, but cannot be recovered after deletion.</li>
                        <li>For security purposes, User must press load table in order to see all passwords</li>
                        <br />
                    </ul>
                </div>
                <button onClick={handleRefresh}>Load Table</button>
                <br /><br />
                <table>
                    <thead>
                        <tr>
                            <th className="otherCell">Key</th>
                            <th className="otherCell">Password</th>
                            <th className="buttonCell"></th>
                            <th className="buttonCell"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
