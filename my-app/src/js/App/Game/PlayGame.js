import React, {useEffect, useState} from "react";
// import PlayedCards from "./PlayedCards";
import PlayerHand from "../../components/PlayerHand";
import Card from "../../components/Card";
import PlayedCardsPile from "./PlayedCardsPile";
import PopUp from "../../components/PopUp";


function PlayGame(props){
    const [winner, setWinner] = useState(null);
    const [gameEnd, setGameEnd] = useState(false);
    const gameState = props.gameState;
    const playedCardsPile = gameState.currentPlay;
    const cId = props.clientId
    const [popUp, setPopUp] = useState(false);
    const playedCards = playedCardsPile.map((card) => 
        <Card suit={card.suit} value={card.value} />
    )
    useEffect( () => {
        if(props.gameState.gameEnd === true) { // there's a winner, game has ended
            setGameEnd(true);
            setWinner(gameState.winner);
            setPopUp(true);
        }
    }, [props.gameState.gameEnd]);

    return (
        <div className="game">
                <PlayedCardsPile playedCards={playedCards}/>
        {Object.keys(gameState.players).map((clientId) => (
            <PlayerHand 
            gameState={gameState}
            gid={props.gid} 
            hand={gameState.players[clientId].hand} 
            clientId={clientId}
            myClientId={cId}
            playerTurn={gameState.playerTurn.clientId}
            self={cId===clientId ? true : false}/> 
            
        ))}
        
        {popUp ? <PopUp winner={gameState.players[winner].playerName} toggle={()=>setPopUp(false)}/> : ""}
        </div>
    )
}


export default PlayGame