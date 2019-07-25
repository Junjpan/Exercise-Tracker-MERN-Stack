import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter as Router,Route} from "react-router-dom";
import Navbar from "./components/navbar";
import ExerciseList from "./components/exerciselist";
import EditExercise from "./components/editexercise";
import CreateExercise from "./components/createexercise";
import CreateUser from "./components/user";
import './App.css';
import axios from "axios";

//set up a global axios defaults
axios.defaults.baseURL="http://localhost:5000"

function App() {
  return (
    <Router>
    <div className="container" >
     <Navbar />
     <br />
     <Route path="/" exact component={ExerciseList} />
     <Route path="/edit/:id" exact component={EditExercise} />
     <Route path="/create" exact component={CreateExercise} />
     <Route path="/user" exact component={CreateUser} />
    </div>
    </Router>
  );
}

export default App;
