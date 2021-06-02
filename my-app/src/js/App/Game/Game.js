import React, { useEffect, useState } from "react";
import LeaveButton from "../../components/LeaveButton";
import Header from "../../components/Header";
import WaitingRoom from "./WaitingRoom";
import PlayGame from "./PlayGame";


function Game(props){
    const clientId = props.clientId
    const gameState = props.gameState
    const[players, setPlayers] = useState({});
    useEffect(() => {
        const unames = gameState.clientIds.reduce((uname, id) => {
            if(uname == ""){
                return gameState.players[id].playerName || "";
            }
            return uname + "," + gameState.players[id].playerName;
        }, "");
        setPlayers(players);
    },[gameState.clientIds])

    return (
        <>
        {!gameState.startGame ? (
        <WaitingRoom
        clientId={clientId}
        gameState={gameState}
        users={players} /> ) : (
            <>
            <PlayGame
                gameState={gameState}
                clientId={clientId}
                gid={props.currentGid}
            />
            </>
        )}
        </>
    );
};

export default Game;