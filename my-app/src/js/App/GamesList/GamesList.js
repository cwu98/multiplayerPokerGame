import React, { useState, useEffect } from "react";
import socket from "../../config";
import { handleJoinGame } from "../../handlers";

function GamesList(props) {
    const [gamesList, setGamesList] = useState({});
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        socket.on("getGamesList", (data) => {
            setGamesList(data);
            setLoading(false);
         });
    },[])

    useEffect(() => {
        if(socket.connected) {
            handleGetGamesList()
        }
    }, [])

    function handleGetGamesList() {
        setLoading(true);
        socket.emit("getGamesList")
    }

    return (
        <div className="bg-white rounded border border-info mt-4 p-2">
            <div className="grid grid-cols-3 text-right gap-2">
                <div className="text-center mt-3 h3 mb-5">Games List</div>
                {/*<div>
                    <button className="reload-btn btn btn-outline btn-lg" onClick={handleGetGamesList}><i className="fa fa-refresh"></i>
</button>
                </div>*/}
            </div>
            <div className="row text-center h5">
                <div className="col-4">Game Name</div>
                <div className="col-4">Players</div>
                <div className="col-4">Status</div>
            </div>
            <hr className="w-100"></hr>
                {Object.keys(gamesList).length > 0 ? (
                    Object.keys(gamesList).map((gid) => (
                        <div key={gid} className="row text-center text-sm mb-4">
                            <div className="col-4">{gamesList[gid].gameName}</div>
                            <div className="col-4">{gamesList[gid].clientIds.length}/4</div>
                            <div className="col-4">
                                { !gamesList[gid].startGame ? (
                                    <div>
                                        <button
                                        className="btn btn-outline-dark"
                                        onClick={() => handleJoinGame(props.clientId, gid, props.playerName)}>Join</button>
                                    </div>
                                ) : <div>Full</div> }
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="font-weight-normal text-center text-lg">No games</div>
                )}
            </div>
        
    )
}

export default GamesList;