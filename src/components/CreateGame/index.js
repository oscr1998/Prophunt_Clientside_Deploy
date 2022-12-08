import { React, useState } from "react";
import { motion } from "framer-motion";
import Backdrop from "../Backdrop";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { store_gameInfo, store_roomInfo } from "../../actions/socket/socketSlice";
import { useNavigate } from "react-router-dom";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

export default function CreateGame({ handleClose, setCreateGameModel = { setCreateGameModel }}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const socket = useSelector(state => state.socket.socket);

  const [errMsg, setErrMsg] = useState(null)
  const [gameInfo, setGameInfo] = useState({
    map: 0,
    gameMode: 0,
    roomSize: 2,
  });

  function handelCreateGame(e) {
    e.preventDefault();
    //todo Send create game detail to backend
    //todo upon successful post request:
    //todo      - render a msg: created
    //todo      - setCreateGameModel(false)
    //todo      - navigate('/lobby')
    //todo if failed:
    //todo      - render an error msg
    if(gameInfo.roomSize > gameInfo.gameMode){
      setErrMsg("")
      const roomID = Math.floor(Math.random()*1000000).toString()
    //   socket.emit('create-game', gameInfo, roomID, msg => { 
    //     console.log(`ID(${msg.id}) has create room(${msg.room})`);
    //     dispatch(store_roomInfo(roomID))
    //     navigate('/lobby')
    // })
    socket.emit('join-room', roomID, true, gameInfo, msg => { 
      console.log(`ID(${msg.id}) has created and joined room(${msg.room})`);
      dispatch(store_roomInfo({ roomID: roomID, isHost: true }))
      dispatch(store_gameInfo(gameInfo))
      navigate('/lobby')
  })
    } else {
      setErrMsg("You must have at least one hider in the game.")
    }
  }


  return (
    <form id="createForm" onSubmit={handelCreateGame}>
      <Backdrop onClick={handleClose}>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="loginContainer createpopup nes-container is-centered">
            <button
              className="closebtn"
              onClick={() => {
                setCreateGameModel(false);
                return false;
              }}
            >x</button>
            <br />
            
            <h1>Create Game</h1>

            <label id="maplabel">
              <div className="nes-select is-dark">
                <select
                  required
                  id="dark_select"
                  value={gameInfo.map}
                  onChange={(e) => {
                    setGameInfo({
                      ...gameInfo,
                      map: e.target.value,
                    });
                  }}
                >
                  <option value="0" key="0" disabled>Select Map</option>
                  <option value="1" key="1">Skidrow</option>
                  <option value="2" key="2">Skull Island</option>
                </select>
                <br />
              </div>
            </label>

                <label id="gamemodelabel">
            <div className="nes-select is-dark">
                <select
                  required
                  id="dark_select"
                  value={gameInfo.gameMode}
                  onChange={(e) => {
                    setGameInfo({
                      ...gameInfo,
                      gameMode: e.target.value,
                    });
                  }}
                >
                  <option value="0" key="0" disabled>Select Game Mode</option>
                  <option value="1" key="1">1 Hunters</option>
                  <option value="2" key="2">2 Hunters</option>
                </select>
                <br />
              </div>
            </label>

            <label>
              Room Size:
              <input
                className="createroomsize"
                required
                type="number"
                min={2}
                max={5}
                value={gameInfo.roomSize}
                onChange={(e) => {
                  setGameInfo({
                    ...gameInfo,
                    roomSize: e.target.value,
                  });
                }}
              />
              <br />
            </label>
            <h3 style={{"color": "#D04E3E"}}>{errMsg}</h3>
            <input type="submit" value="Submit" disabled={gameInfo.map === 0 || gameInfo.gameMode === 0}/>
          </div>
        </motion.div>
      </Backdrop>
    </form>
  );
}
