import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
  return (
    <div 
      className='flex flex-row gap-4 p-3 w-full' 
      style={{ backgroundColor: '#f3e6ff', color: '#6B21A8', textAlign: 'left', marginTop: 0 }}
    >
      <NavLink 
        to='/' 
        style={{ textDecoration: 'underline', color: '#6B21A8' }}
      >
        Home
      </NavLink>
      <NavLink 
        to='/pastes' 
        style={{ textDecoration: 'underline', color: '#6B21A8' }}
      >
        All Documents
      </NavLink>
    </div>
  )
}

export default Navbar
