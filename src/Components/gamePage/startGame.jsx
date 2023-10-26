import React, { Component } from "react";
import botRobot from "../assets/images/images/gameStartbotPlayer.png";
import robo2img from "../assets/images/images/robo2img.png";
import globe from "../assets/images/images/globeimg.png";
import { pushRoute } from "../Services/pushRoute";
import flagimg2 from "../assets/images/images/flag2.png";
import flagimg1 from "../assets/images/images/flag1.png";
import auth from "../Services/authService";
import NavBar from "./navbar";
import { Modal } from "react-bootstrap";

class StartGame extends Component {
  state = {
    menuCardShow: false,
    shareCardShow: false,
  };

  handleMenuToggle = () => {
    this.setState((prevState) => ({
      menuCardShow: !prevState.menuCardShow,
    }));
  };

  handleShareToggle = () => {
    this.setState((prevState) => ({
      shareCardShow: !prevState.shareCardShow,
    }));
  };

  handlelogout = () => {
    const { navigate } = this.props;
    auth.logout();
    navigate("/loginform");
  };

  render() {
    const { navigate } = this.props;

    return (
      <>
        <NavBar />
        <div className="startgame-bg">
          <div className="menuicons">
            <span>
              <i
                className="fa-solid fa-bars ficons fa-2xl text-light"
                onClick={this.handleMenuToggle}
                type="button"
              ></i>
            </span>

            <span className="flags ficons">
              <img src={flagimg1} className="flag" alt="flag" />
              <img src={flagimg2} className="flag" alt="flag" />
            </span>
            <span className="ficons rank" style={{ fontWeight: "bold" }}>
              Rank: 0
            </span>
            <span>
              <i className="fa-regular fa-star ficons fa-2xl text-light"></i>
            </span>

            <span>
              <i
                className="fa-solid fa-share-nodes fa-2xl ficons text-light"
                onClick={this.handleShareToggle}
                type="button"
              ></i>
            </span>

            <button className="logout" onClick={this.handlelogout}>
              Logout
            </button>
          </div>

          <div className="team">
            <div className="player">
              <h4>Player</h4>
            </div>
            <div className="mainhead">
              <h4>Tapatan</h4>
              <h5>Win with skill!</h5>
            </div>
          </div>

          <div className="card_container">
            <div className="startgame-card" onClick={() => navigate("/game")}>
              <button className="mbtn">
                <img src={botRobot} className="gameimg" alt="roboimg" />
                <h2>One player</h2>
              </button>
            </div>

            <div className="startgame-card">
              <button className="mbtn">
                <img src={botRobot} className="gameimg" alt="roboimg" />
                <img src={globe} className="gameimg2" alt="globeimg" />
                <img src={robo2img} className="gameimg" alt="roboimg" />
                <h2>Multiplayer</h2>
              </button>
            </div>
          </div>
        </div>

        <div>
          <Modal
            show={this.state.menuCardShow}
            onHide={this.handleMenuToggle}
            centered
          >
            <Modal.Body className="modelcard2" closeButton>
              <div>
                <h4 className="menuhead">Menu</h4>
                <p className="iconshead">
                  <i className="fa-regular fa-circle-question ficons22"></i>Help
                </p>
                <p className="iconshead">
                  <i className="fa-solid fa-gear ficons22"></i>Settings
                </p>
                <p className="iconshead">
                  <i className="fa-solid fa-user ficons22"></i>Developers
                </p>
                <p className="iconshead">
                  <i className="fa-solid fa-chart-simple  ficons22"></i>High
                  Score
                </p>

                <p>Our other games</p>
              </div>
            </Modal.Body>
          </Modal>
        </div>

        <div className="share">
          <Modal
            show={this.state.shareCardShow}
            onHide={this.handleShareToggle}
            centered
          >
            <Modal.Body className="modelcard2" closeButton>
              <div class="">
                <h3 className="sharehead">Share</h3>
                <h6 className="invite">Invite Friends</h6>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}

export default pushRoute(StartGame);
