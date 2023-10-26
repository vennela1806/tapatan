import React, { Component } from "react";
import botRobot from "../assets/images/images/botPlayer.jpg";
import userRobot from "../assets/images/images/userPlayer.jpg";
import gameServices, { makeMove, startGame } from "../Services/gameServices";
import { pushRoute } from "../Services/pushRoute";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import AudioFile2 from "../assets/images/audios/defeat.mp3";
import AudioFile from "../assets/images/audios/mixkit-audience-light-applause-354.wav";
import GameAudio from "../assets/images/audios/game.mp3";
import NavBar from "./navbar";
import gamemodal from "../assets/images/images/gamemodal.png";

class Game extends Component {
  state = {
    data: {
      firstplayer: "1",
      userPlayerId: "1",
    },
    botEnteredPositions: [],
    userEnteredPositions: [],
    selectedImg: null,
    playerImg1: "",
    playerImg2: "",
    playerImg3: "",
    turn: "0",
    selectedPosition: "",
    gameId: "",
    winner: "",
    modalCardShow: false,
    helpCardShow: false,
    wonPlayer: "",
    wonBot: "",
  };

  componentDidMount() {
    this.renderOnePlayerGame();
  }

  handlePlayAgain = () => {
    this.setState({
      modalCardShow: false,
    });
    const firstplayer = this.state.winner;

    this.renderOnePlayerGame();

    this.setState({
      playerImg1: "",
      playerImg2: "",
      playerImg3: "",
    });
  };

  handleHelpToggle = () => {
    this.setState((prevState) => ({
      helpCardShow: !prevState.helpCardShow,
    }));
  };

  handleClosemodal = () => {
    const { navigate } = this.props;
    this.setState({ modalCardShow: false });
    navigate("/startGame");
  };

  renderOnePlayerGame = async () => {
    this.setState({ wonBot: "", wonPlayer: "" });
    try {
      const { firstplayer } = this.state.data;
      const response = await startGame(firstplayer);
      this.setState({
        turn: response.turn,
        botEnteredPositions: response.bot,
        userEnteredPositions: response.user,
        gameId: response.gameId,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };

  handlepositions = async (e) => {
    const selectedPosition = e.target.textContent;
    this.setState({ selectedPosition });

    const { selectedImg, gameId, data, winner } = this.state;
    if (selectedImg === "") {
      toast.error("Please select member to move", {
        className: "custom-toast",
      });
    } else {
      try {
        const response = await makeMove(
          gameId,
          data.userPlayerId,
          selectedImg.charAt(selectedImg.length - 1),
          selectedPosition
        );
        console.log(response, "user");
        const positionToClass = {
          1: "player-cell1",
          2: "player-cell2",
          3: "player-cell3",
          4: "player-cell4",
          5: "player-cell5",
          6: "player-cell6",
          7: "player-cell7",
          8: "player-cell8",
          9: "player-cell9",
        };

        this.setState({
          [selectedImg]: positionToClass[selectedPosition],
          userEnteredPositions: response.user,
          selectedImg: "",
        });

        setTimeout(() => {
          this.setState({
            turn: response.turn,
            botEnteredPositions: response.bot,
          });
        }, 400);

        setTimeout(() => {
          if (response.winner === "1") {
            this.setState({ wonPlayer: "wonPlayer" });
          }
          if (response.winner === "0") {
            this.setState({ wonBot: "wonBot" });
          }
        }, 400);
        this.handleWinner(response.winner);
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          toast.error(ex.response.data, {
            className: "custom-toast",
          });
        }
      }
    }
  };

  handleSelPlayerImg = (e) => {
    const usermember = e.target.id.charAt(e.target.id.length - 1);
    const userEnteredPositions = this.state.userEnteredPositions;
    if (
      userEnteredPositions &&
      usermember &&
      userEnteredPositions[usermember] &&
      userEnteredPositions[usermember].canMove
    ) {
      const canMove = userEnteredPositions[usermember].canMove;
      if (canMove === true) {
        this.setState({ selectedImg: e.target.id });
      } else {
        this.setState({ selectedImg: "" });
      }
    }
  };

  handleWinner = (winner) => {
    if (winner !== "pending") {
      setTimeout(() => {
        this.setState({ winner, modalCardShow: true });
      }, 2000);
    }
  };

  handleReset = async () => {
    try {
      const { gameId } = this.state;
      const response = await gameServices.reset(gameId);
      console.log(response);
      this.setState({
        playerImg1: "",
        playerImg2: "",
        playerImg3: "",
        selectedImg: "",
        turn: response.turn,
        botEnteredPositions: response.bot,
        userEnteredPositions: response.user,
      });

      toast.success("Game was reset !!", {
        className: "custom-toast",
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data, {
          className: "custom-toast",
        });
      }
    }
  };

  handleBotEntpositions(botPositions, botMember) {
    if (
      botPositions &&
      botPositions[botMember] &&
      botPositions[botMember] &&
      botPositions[botMember].position
    ) {
      const position = botPositions[botMember].position;
      if (position === "1") return "robo-cell1";
      if (position === "2") return "robo-cell2";
      if (position === "3") return "robo-cell3";
      if (position === "4") return "robo-cell4";
      if (position === "5") return "robo-cell5";
      if (position === "6") return "robo-cell6";
      if (position === "7") return "robo-cell7";
      if (position === "8") return "robo-cell8";
      if (position === "9") return "robo-cell9";
    }

    return "";
  }

  render() {
    const {
      botEnteredPositions,
      turn,
      playerImg1,
      playerImg2,
      playerImg3,
      selectedImg,
      modalCardShow,
      winner,
      wonBot,
      wonPlayer,
    } = this.state;
    const { navigate } = this.props;
    return (
      <>
        {/* <audio controls autoPlay style={{ display: "none" }}>
          <source src={GameAudio} type="audio/wav" />
        </audio> */}

        <NavBar />

        <div className="victory">
          {modalCardShow && (
            <Modal
              show={modalCardShow}
              onHide={this.handleClosemodal}
              backdrop="static"
              centered
            >
              <Modal.Body
                className={`${winner === "1" ? "wincard" : "losscard"}`}
              >
                {winner === "1" && (
                  <audio controls autoPlay style={{ display: "none" }}>
                    <source src={AudioFile} type="audio/wav" />
                  </audio>
                )}
                {winner === "0" && (
                  <audio controls autoPlay style={{ display: "none" }}>
                    <source src={AudioFile2} type="audio/wav" />
                  </audio>
                )}

                <div className="vicotrycard">
                  <h1>{winner === "1" ? "Victory!" : "Defeat!"}</h1>
                  <h2>Turns:</h2>
                  <h2>{turn}</h2>
                  <h1 className="again" onClick={this.handlePlayAgain}>
                    Play Again
                  </h1>
                  <i
                    variant="secondary"
                    class="fa-solid fa-xmark close"
                    onClick={this.handleClosemodal}
                  ></i>
                </div>
              </Modal.Body>
            </Modal>
          )}
        </div>
        <div className="game-menuicons-container">
          <div className="game-menuicons">
            <span>
              <i
                className="fa-solid fa-arrow-right-from-bracket fa-rotate-180 back-button"
                onClick={() => navigate("/startGame")}
              ></i>
            </span>
            <span className="game-ficons rank">Rank: 0</span>
            <span className="game-hint">
              <i
                className="fa-solid fa-circle-question"
                onClick={this.handleHelpToggle}
              ></i>
            </span>
            <span className="game-ficons turn">Turn: {turn}</span>
            <span>
              <i
                className="fa-solid fa-rotate-right fa-flip-horizontal reset"
                onClick={() => this.handleReset()}
              ></i>
            </span>
          </div>
        </div>

        <div className="main-bg">
          <div className="grid">
            <img
              id="botImg1"
              className={`robo-img robo-img-first  ${wonBot} ${this.handleBotEntpositions(
                botEnteredPositions,
                "1"
              )}`}
              src={botRobot}
              alt="robo"
            />
            <img
              id="botImg2"
              className={`robo-img robo-img-second ${wonBot}  ${this.handleBotEntpositions(
                botEnteredPositions,
                "2"
              )}`}
              src={botRobot}
              alt="robo"
            />
            <img
              id="botImg3"
              className={`robo-img robo-img-last ${wonBot} ${this.handleBotEntpositions(
                botEnteredPositions,
                "3"
              )}`}
              src={botRobot}
              alt="robo"
            />

            <div className="grid-container">
              {Array.from({ length: 3 }).map((_, rowIndex) => (
                <div key={rowIndex} className="cell-row">
                  {Array.from({ length: 3 }).map((_, colIndex) => (
                    <div
                      key={colIndex}
                      className="cell"
                      onClick={(e) => this.handlepositions(e)}
                    >
                      <span className="placeNumber">
                        {rowIndex * 3 + colIndex + 1}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <img
              id="playerImg1"
              className={`player-img player-img-first ${wonPlayer} ${playerImg1} ${
                selectedImg === "playerImg1" ? "selected-img" : ""
              }`}
              src={userRobot}
              alt="player"
              onClick={(e) => this.handleSelPlayerImg(e)}
            />

            <img
              id="playerImg2"
              className={`player-img player-img-second ${wonPlayer} ${playerImg2} ${
                selectedImg === "playerImg2" ? "selected-img" : ""
              }`}
              src={userRobot}
              alt="player"
              onClick={(e) => this.handleSelPlayerImg(e)}
            />

            <img
              id="playerImg3"
              className={`player-img player-img-last  ${wonPlayer} ${playerImg3} ${
                selectedImg === "playerImg3" ? "selected-img" : ""
              }  `}
              src={userRobot}
              alt="player"
              onClick={(e) => this.handleSelPlayerImg(e)}
            />
          </div>
        </div>

        <Modal
          show={this.state.helpCardShow}
          onHide={this.handleHelpToggle}
          centered
        >
          <Modal.Body className="modelcard23" closeButton>
            <div>
              <ol className="instructions">
                <li>Set Up Heroes On the field.</li>
                <li>
                  Move the Heroes to make a line horizontally , vertically and
                  diagonally.
                </li>
                <li>Collect 3 Heroes in the line to win.</li>
              </ol>
              <img
                src={gamemodal}
                alt="gamemodelimage"
                className="gamemodelimg"
              />
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default pushRoute(Game);
