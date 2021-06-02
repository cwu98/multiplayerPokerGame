import React from "react"
import { useEffect, useState } from "react"
// import PlayedCards from "./PlayedCards"
import PlayerHand from "../../components/PlayerHand"
import Card from "../../components/Card"
import PlayedCardsPile from "./PlayedCardsPile"
import CardBack from "../../components/CardBack"



function PlayGame(props){

    const gameState = props.gameState;
    const playedCardsPile = gameState.currentPlay;
    const cId = props.clientId
    const playedCards = playedCardsPile.map((card) => 
        <Card suit={card.suit} value={card.value} />
    )

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
            self={cId==clientId ? true : false}/> 
            
        ))}
        </div>
    )
}


export default PlayGame