import React, { useEffect, useState } from "react";
import WaitingRoom from "./WaitingRoom";
import PlayGame from "./PlayGame";
import ChatWindow from "../Chat/ChatWindow"
import Button from "../../components/Button"
import { handleNewGame } from "../../handlers";

function Game(props){
    const clientId = props.clientId
    const gameState = props.gameState
    const[players, setPlayers] = useState({});
    const gid = props.currentGid;
    useEffect(() => {
        setPlayers(players);
    },[gameState.clientIds, players])

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
                gid={gid}
            />
            {clientId === gameState.host ? <Button className="play-again-btn" onClick={()=>handleNewGame(props.clientId, gid)}>New Game</Button> : "" }
            <ChatWindow gameState={gameState} clientId={clientId}/>
            
            </>
        
        )}

        </>
    );
};

export default Game;