import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../Navbar.css'


export default function FreeNavbar() {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    let navigate = useNavigate();

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

    function handleSignIn() {
        toggleNav();
        navigate("../login", { replace: true });
    }

    function handleRegister() {
        toggleNav();
        navigate("../Register", { replace: true });
    }


    return (
        <section>
            <nav>
                <Link to="/" className='navTitle'><p>Password Genny</p></Link>
                {(toggleMenu || screenWidth > 1000) && (
                    <ul className="nav-links">
                        <li onClick={handleSignIn}><button>Sign In</button></li>
                        <li onClick={handleRegister}><button>Register</button></li>
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

