import Card from "./Card"
import React, { useState, useEffect } from "react"
import SortableList, {SortableItem} from "react-easy-sort"
import arrayMove from "array-move"
import CardBack from "./CardBack" 
import { handlePass, handlePlayCards } from "../handlers"



function PlayerHand(props){
    const gid = props.gid;
    const gameState = props.gameState;
    const self = props.self;
    const myClientId = props.myClientId;
    const clientId = props.clientId;
    const playerTurn = props.playerTurn;
    const [playerHand, setPlayerHand ] = useState(gameState.players[clientId].hand);
    const [selectedCards, setSelectedCards] = useState([]);
    
    useEffect(()=>{
        setPlayerHand(props.gameState.players[clientId].hand)
    },[props.gameState, clientId])

    const handleSelectCard = (card) => {
        if(selectedCards && selectedCards.includes(card)){
            // card has been selected again -> player wants to 'unselect' that card
            const temp = selectedCards.filter((c) => c !== card);
            setSelectedCards(temp)
        } else if (self) {
            setSelectedCards([...selectedCards, card]);
        }
    }

    const handlePlay = (clientId, gid, playerHand, selectedCards) => {
        handlePlayCards(clientId, gid, playerHand, selectedCards)
        setSelectedCards([])
    }

    const onSortEnd = (oldIndex, newIndex) => {
        setPlayerHand((array) => arrayMove(array, oldIndex, newIndex));
    }
    
    return (
        <div className={`playerInterface ${playerTurn===clientId ? "playerTurn" : ""}`}>
            <div className="name b">{gameState.players[clientId].playerName}
                <span>{self ? <div>(Me)</div> : <div></div>}</span>
            </div>
            {playerHand ? 
            (self ? (
                <>
                <SortableList onSortEnd={onSortEnd}  className="cards" draggedItemClassName="dragged">
                    {playerHand.map((card, index) => 
                        <SortableItem key={`${card.value} ${card.suit}`}>
                            <div onClick={()=>handleSelectCard(card)} className={`${selectedCards && selectedCards.includes(card) ? "selected" : ""} item`}><Card value={card.value} suit={card.suit}/></div>
                        </SortableItem>
                    )}
                </SortableList>
                </>
            ) : (
                <div className="cards">
                        {playerHand.map((card) => 
                            <CardBack />
                        )}
                    </div>
                )
            ) : <></>}
            {self ? <div className="btn-group">
                    <button disabled={playerTurn === clientId ? false : true} className="btn btn-outline-info btn-block" type="button" onClick={() => handlePlay(clientId, gid, playerHand, selectedCards)}>Play</button>
                    <button disabled={playerTurn === clientId ? false : true} className="btn btn-outline-info btn-block" type="button" onClick={() => handlePass(myClientId, gid)}>Pass</button>
                </div> : <></>}
        </div>
    )
}

export default PlayerHand