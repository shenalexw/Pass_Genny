import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../Navbar.css'


export default function FreeNavbar() {
    let navigate = useNavigate();

    function handleSignIn() {
        navigate("../login", { replace: true });
    }

    function handleRegister() {
        navigate("../Register", { replace: true });
    }

    return (
        <section>
            <nav>
                <Link to="/" className='navTitle'><p>Password Genny</p></Link>
                <ul className="nav-links">
                    <li onClick={handleSignIn}><button>Sign In</button></li>
                    <li onClick={handleRegister}><button>Register</button></li>
                </ul>
            </nav>
        </section>
    )

}

