import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css'


function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

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


    return (
        <section>
            <nav>
                <Link to="/" className='navTitle'><p>Password Genny</p></Link>
                {(toggleMenu || screenWidth > 1000) && (
                    <ul className="nav-links">
                        <li onClick={toggleNav}><Link to="/">Home</Link></li>
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

export default Navbar