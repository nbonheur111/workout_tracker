import React from 'react'
import { Link } from 'react-router-dom'
import "./index.css"

const Navbar = ({ user, onLogout }) => {

  return (
    <nav>
      <div className="nav-links">
        <Link to="/workout" >Workout History</Link>
        &nbsp; | &nbsp;
        <Link to="/workout/create" >Log Workout</Link>
        &nbsp; | &nbsp;
        <Link to="/workout/edit" >Edit Workout</Link>
        
      </div>
      <div>
      <span>{user.username}</span>
      {user && (
         
        <button onClick={onLogout}>Logout</button>
      )}
      </div>
    </nav>
  )
}

export default Navbar
