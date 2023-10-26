import React, { Component } from "react";
import menuIcon from "../assets/images/images/menuIcon.png";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-dark">
        <span className="startgame-adtag">Codegene Games</span>
        <span className="startgame-adtag">Tapatan</span>
        <div className="startgame-navicons">
          <span>
            <img src={menuIcon} className="yanimg" />
          </span>
          <span>
            <i className="fa-solid fa-bars ficonst"></i>
          </span>
          <span>
            <i className="fa-solid fa-down-left-and-up-right-to-center ficonst"></i>
          </span>
        </div>
      </nav>
    );
  }
}

export default NavBar;
