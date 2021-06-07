import React from "react";
import { handleStartGame } from "../../handlers"
import JoinLink from "./JoinLink";

function WaitingRoom(props){
    const clientId = props.clientId
    const gameState = props.gameState
    return (
        <>
            <div className="flex flex-col space-y-2 my-2">
                <h2 className="text-center text-3xl font-semibold">{gameState.gameName}</h2>
                <h3 className="px-2">Players: </h3>
                {gameState.clientIds.map((id) => (
                    <div key={id} className="p-4 border rounded">
                        <h5 className="text-dark">
                            {gameState.players[id].playerName}
                        {gameState.host === id && <span className="px-2">(Host)</span>}
                        </h5>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center py-4">
                <JoinLink gid={gameState.id} /> 
            </div>
                <h5 className="mt-5 text-center">Host can start game once there are 4 players.</h5>
            <div className="d-flex py-4 justify-content-center">
            {gameState.host === clientId && (
                <div className="w-25">
                    <button disabled={gameState.clientIds.length >= 2 ? false : true} className="btn btn-info btn-lg btn-block"
                    onClick={() => handleStartGame(clientId, gameState.id)}>Start</button>
                </div>
                )}
                </div> 
        </>
    )
}

export default WaitingRoom