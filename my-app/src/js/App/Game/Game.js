import React, { useEffect, useState } from "react";
import WaitingRoom from "./WaitingRoom";
import PlayGame from "./PlayGame";
import ChatWindow from "../Chat/ChatWindow"

function Game(props){
    const clientId = props.clientId
    const gameState = props.gameState
    const[players, setPlayers] = useState({});
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
                gid={props.currentGid}
            />
            <ChatWindow gameState={gameState} clientId={clientId}/>
            
            </>
        
        )}

        </>
    );
};

export default Game;