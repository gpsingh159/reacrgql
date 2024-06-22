import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const NavBar: React.FC = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    return (
        <nav>
            <div className="nav-wrapper #673ab7 deep-purple">
                <NavLink to="/" className="brand-logo left">Logo</NavLink>
                <ul id="nav-mobile" className="right">
                    <li><NavLink to="/" >Home</NavLink> </li>

                    {
                        token ?
                            <>
                                <li><NavLink to="/profile">Profile</NavLink> </li>
                                <li><NavLink to="/create">Create Quotes </NavLink> </li>
                                <li><button className='red btn' onClick={() => {
                                    localStorage.removeItem("token")
                                    navigate("/login")
                                }}>Logout</button> </li>
                            </>
                            :
                            <>
                                <li><NavLink to="/login">Login</NavLink> </li>
                                <li><NavLink to="/signup">Signup</NavLink> </li>
                            </>
                    } 

                </ul>
            </div>
        </nav>
    )
}

export default NavBar