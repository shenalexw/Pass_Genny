import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from 'react-simple-snackbar';
import './Navbar.css';


export default function Navbar({ setToken, setIdentification }) {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
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

    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
        ham();
    }

    const ham = () => {
        const burger = document.querySelector(".burger");
        burger.classList.toggle("toggle");
    }


    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', changeWidth)
    }, [])

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
                {(toggleMenu || screenWidth > 1000) && (
                    <ul className="nav-links">
                        <li onClick={handleViewPasswords}><button>View Passwords</button></li>
                        <li onClick={handleSignOut}><button>Sign Out</button></li>
                    </ul>
                )}

                <div className="burger" onClick={toggleNav}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>

        </section>
    )

}