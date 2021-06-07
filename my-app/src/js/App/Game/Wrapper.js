import Navbar from "../../components/Navbar";
import socket from "../../config";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import CreateGame from "./CreateGame"
import JoinGame from "./JoinGame"

function Wrapper(){
    const [clientId, setClientId] = useState("");
    const [gameState, setGameState] = useState(null);
    const [error, setError] = useState("");
    const [currentGid, setCurrentGid] = useState(undefined);
    
    useEffect(() => {
            socket.on("connected", (payload) => {
                console.log("Connected as ", payload.clientId)
                localStorage.setItem("clientId", payload.clientId)
                setClientId(payload.clientId);
                if(payload.currentGid) {
                    setCurrentGid(payload.currentGid);
                }
            })
            socket.on("update", (payload) => {
                setGameState(payload.gameState);
                setError("");
                if(payload.currentGid){
                    setCurrentGid(payload.currentGid)
                }
            })

            socket.on("error", (payload) => {
                setError(payload.message);
            });
    }, []);
    
    return(
        <>
        <Navbar gameState={gameState} />
        <div className="container">
            <Router>
                <Switch>
                    <Route 
                    exact path="/game"
                    render={() => (
                    <CreateGame
                    clientId={clientId}
                    gameState={gameState}
                    currentGid={currentGid} />
                    )}
                    />
                    <Route
                    path="/game/:id?"
                    render={() => (
                        <JoinGame
                        clientId={clientId}
                        gameState={gameState}
                        currentGid={currentGid}
                        />
                    )}
                    />
                </Switch>
            </Router>
        </div>
        </>
    );
}

export default Wrapper;