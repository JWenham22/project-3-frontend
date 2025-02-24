// src/components/NavBar/NavBar.jsx
import { useContext } from "react";
import { Link } from "react-router";
import './NavBar.css'

import { UserContext } from "../../contexts/UserContext";


const NavBar = () => {
    // Pass the UserContext object to the useContext hook to access:
  // - The user state (which we use here).
  // - The setUser function to update the user state (which we aren't using).
  //
  // Destructure the object returned by the useContext hook for easy access
  // to the data we added to the context with familiar names.
  const { user, setUser } = useContext(UserContext)

  function handleSignOut(){
    // destroy the token! 
    localStorage.removeItem('token')
    // clearing out our state
    setUser(null)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Left Section - Greeting */}
        {user && (
          <div className="nav-left">
            <span className="nav-greeting">Hello, {user.username}</span>
          </div>
        )}

        {/* Center Section - App Name */}
        <div className="nav-center">
          <span className="nav-title">CODE_tracker</span>
        </div>

        {/* Right Section - Dashboard & Sign Out */}
        {user ? (
          <div className="nav-right">
            <Link to="/" className="nav-dashboard">Dashboard</Link>
            <button className="nav-signout" onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <div className="nav-right">
            <Link to="/">Home</Link>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

