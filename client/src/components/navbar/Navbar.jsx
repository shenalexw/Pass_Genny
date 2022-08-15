import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from 'react-simple-snackbar';
import './Navbar.css';

export default function Navbar({ setToken, setIdentification }) {
    let navigate = useNavigate();

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

    function handleSignOut() {
        setToken({ "token": null });
        setIdentification({ "identification": null });
        openSnackbar("Signed Out", 2000);
        navigate("../", { replace: true });
    }

    function handleViewPasswords() {
        navigate("../view", { replace: true });
    }


    return (
        <section>
            <nav>
                <Link to="/" className='navTitle'><p>Password Genny</p></Link>
                <ul className="nav-links">
                    <li onClick={handleViewPasswords}><button>View Passwords</button></li>
                    <li onClick={handleSignOut}><button>Sign Out</button></li>
                </ul>
            </nav>
        </section>
    )

}