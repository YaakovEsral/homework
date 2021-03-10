import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <h1>MERN Blog</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/submitPost">Submit Post</Link>
                <Link to="/login">Login</Link>
            </nav>
        </header>
    )
}
