import { handleJoinGame, handleLeaveGame } from "../../handlers";
import Button from "../../components/Button";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Game from "./Game";
import Navbar from "../../components/Navbar"

function JoinGame(props) {
    const gameState = props.gameState
    const { id } = useParams();
    const [gid] = useState(id ? id : "");
    const [playerName, setPlayerName] = useState("");
    useEffect(() => {
        window.onpopstate = () => {
            handleLeaveGame(props.clientId, gid)
        }
    }, [])
    if (gameState) {
        return (
            <Game
            clientId={props.clientId}
            gameState={props.gameState}
            currentGid={props.currentGid} />    
        )
    }
    
    return (
        <>
        <div className="text-center text-lg h3 m-5">Welcome to Chinese Poker</div>
        <div className="text-center text-lg h4">Enter your name:</div>
        <div className="d-flex justify-content-center mt-3">
            <div className="flex flex-col">
                <input 
                type="text" 
                placeholder="Nickname" 
                className="px-3 py-3 text-lg border"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                />
                <div className="mt-3">
                    <Button onClick={() => handleJoinGame(props.clientId, gid, playerName)}> Join Game </Button>
                </div>
            </div>
        </div>
        </>
    )
}

export default JoinGame