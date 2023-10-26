import React, { Component } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LoginForm from "./Components/authentication/login";
import Register from "./Components/authentication/register";
import Game from "./Components/gamePage/game";
import StartGame from "./Components/gamePage/startGame";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

const protect = (component) => <ProtectedRoute>{component}</ProtectedRoute>;

class App extends Component {
  state = {};

  render() {
    return (
      <>
        <ToastContainer />
        <Router>
          <Routes>
            <Route exact path="/" element={<LoginForm />} />
            <Route exact path="/loginForm" element={<LoginForm />} />
            <Route exact path="/RegisterForm" element={<Register />} />
            {/* <Route exact path="/game" element={<Game />} />
            <Route exact path="/startGame" element={<StartGame />} /> */}

            <Route path="/game" element={protect(<Game />)} />
            <Route path="/startGame" element={protect(<StartGame />)} />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
