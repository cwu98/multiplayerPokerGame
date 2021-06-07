import React from "react";

const suitSymbols = {
  diamonds: "♦",
  clubs: "♣",
  hearts: "♥",
  spades: "♠"
}

function Card(props){
    const value = props.value
    const suit = props.suit
   /*const [selected, setSelected] = useState(false)
    const handleSelected = () => {
      setSelected(!selected)
      props.passChildData(card)
    }*/
    
    return (
        <div className={`card ${suit==="diamonds" || suit==="hearts" ? "red" : "black"}`}>
          <div className="top">
            <span className="cd value">{value ? value : "?"}</span>
            <span className="cd suit">{suit ? suitSymbols[suit] : "?"}</span>
          </div>
          <h1 className="suit">
            {suit ? suitSymbols[suit] : "?"}
          </h1>
          <div className="bottom">
            <span className="cd suit bottom suitRotate">{suit ? suitSymbols[suit] : "?"}</span>
            <span className="cd value bottom valueRotate">{value ? value : "?"}</span>

          </div>
        </div>
      );
}

export default Card