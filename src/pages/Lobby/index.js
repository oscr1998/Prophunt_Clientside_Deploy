import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './style.css'
import { Zoom, Flip } from "react-reveal";
import { useSelector, useDispatch } from "react-redux";

export let room, socket, loadMap

export default function Lobby() {

    const navigate = useNavigate()

    socket = useSelector(state => state.socket.socket)
    room = useSelector(state => state.socket.roomID)
    const isHost = useSelector(state => state.socket.isHost)
    const players = useSelector(state => state.socket.players)
    

    const [errmsg, setErrMsg] = useState(null)

    useEffect(() => {
        socket.on('teleport-players', () => {
            navigate('/game');
        })
    },[])

    useEffect(()=>{
        if(players[socket.id]){
            if(players[socket.id].gameInfo){
            loadMap = players[socket.id].gameInfo.map
            }
        }
    },[players])

    // useEffect(()=>{
    //     if(gameInfo){
    //         loadMap = gameInfo.map
    //     }
    // },[gameInfo])

    function handleStartGame(e){
        e.preventDefault();
        if(!isHost){
            setErrMsg("You are not the host.")
        } else {
            socket.emit('start-game', room)
        }
    }

    return (
        <Zoom>
        <div className="lobbycontainer nes-container is-centered">
            <h1>Room: {room}</h1>
            <h2>Number of Players: {Object.keys(players).length}</h2>
            <h3 style={{"color": "#D04E3E"}}>{errmsg}</h3>
            <Flip><button className="nes-btn is-success" onClick={handleStartGame} >Let's Go</button></Flip>
        </div>
        </Zoom>
    )
}
