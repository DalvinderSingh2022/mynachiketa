import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <NavLink to='/profile' className='btn'>
                profile
            </NavLink>
        </nav>
    )
}

export default Navbar;