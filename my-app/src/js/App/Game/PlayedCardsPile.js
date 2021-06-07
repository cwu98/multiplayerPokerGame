import React from "react"

function PlayedCardsPile(props){
    const playedCards = props.playedCards

    return (
        <>
        {playedCards.length > 0 ? 
        (
            <div className="pileCards">{playedCards}</div>
        ) : (
            <div className="pileCards message">No cards played yet</div>
        )}
        </>
    )
}

export default PlayedCardsPile