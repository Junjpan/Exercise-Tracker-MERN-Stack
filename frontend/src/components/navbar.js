import React, {Component} from "react";
import {Link} from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
          <nav className="navbar navbar-dark navbar-expand-lg container" style={{backgroundColor:"gray"}}>
            <Link to="/" className="navbar-brand">ExerciseTracker</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent1">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collpase navbar-collapse" id="navbarContent1">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
              <Link to="/" className="nav-link">Exercises</Link>
              </li>
              <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Exercise Log</Link>
              </li>
              <li className="navbar-item">
              <Link to="/user" className="nav-link">Create User</Link>
              </li>
            </ul>
            </div>
          </nav>
        );
      }



} 

export default Navbar