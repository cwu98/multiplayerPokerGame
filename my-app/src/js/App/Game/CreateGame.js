import React, { useEffect, useRef, useState } from "react";
import { handleCreateGame } from "../../handlers";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import GamesList from "../GamesList/GamesList";
import socket from "../../config";

function CreateGame(props) {
    const gameState = props.gameState;
    const [playerName, setPlayerName] = useState("");
    const [gameName, setGameName] = useState("");
  //  const currentGid = useRef(gameState?.id);
    const history = useHistory();

    useEffect(() => {
        socket.on("created", (payload) => {
            const gameId = payload.currentGid
            history.push(`/game/${gameId}`)
        })
        socket.on("joined", (payload) => {
            const gameId = payload.currentGid
            history.push(`/game/${gameId}`)
        })
    }, []);
    return (
        <>
        <div className="flex justify-center">
            <div className="flex flex-col">
                <div className="my-4 flex form-group">
                    <input
                    type="text"
                    placeholder="Your Name"
                    className="px-3 py-3 mr-4 border border rounded border-primary input"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    />
                </div>
                <div className="d-flex mt-2">
                    <input
                    type="text"
                    placeholder="Game Name"
                    className="px-3 py-3 mr-2 border border rounded border-primary input"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    />
                    <div className="col-2">
                    <Button
                    onClick={() => handleCreateGame(
                        props.clientId,
                        playerName,
                        gameName 
                    )}>Create Game</Button>
                    </div>
                </div>
            </div>
        </div>
        <GamesList clientId={props.clientId} playerName={playerName} />
        </>
    )
}

export default CreateGame;