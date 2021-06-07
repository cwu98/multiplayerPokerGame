import React from "react";

function Collapsible(){
    let myLabels = document.querySelectorAll('.lbl-toggle');

Array.from(myLabels).forEach(label => {
  label.addEventListener('keydown', e => {
    // 32 === spacebar
    // 13 === enter
    if (e.which === 32 || e.which === 13) {
      e.preventDefault();
      label.click();
    };
  });
});
    return(
        <div className="wrap-collabsible">
            <input id="collapsible" className="toggle" type="checkbox"/>
            <label htmlFor="collapsible" className="lbl-toggle">Rules</label>
            <div className="collapsible-content">
                <div className="content-inner">
                    <p><pre className="pre">
                         There are variants to this game so feel free to play according to your own rules.<br></br>
                         Cards can be played as singles, pairs, or in a group of 5. (Some variations allow triplets)<br></br>
                         Orders(value): 3  4  5  6  7  8  9  10  J  Q  K  A  2 (3 is smallest, 2 is largest) <br></br>
                         Orders(suits): diamonds ♦   clubs ♣   hearts ♥   spades ♠ (♦ is smallest, ♠ is largest) <br></br>
                         Rankings: <br></br>
                        </pre>
                    </p>
                         <ul>
                           <li>Singles: ranked by value with suit being the tie breaker. (A♠ {">"} A♥ {">"} K♠)</li>
                           <li>Pairs: ranked by value of the two matching cards, with the larger suit being the tie-breaker. (8♠ 8♣ {">"} 8♥ and 8♦.)</li>
                           <li>Five-card hands: 
                             <ul>
                               <li>Straight: any five cards in a sequence (ex: A-2-3-4-5, 10-J-Q-K-A)
                                 <br></br>- ranked by value of the biggest card, with suit of that card being the tie-breaker
                                 <br></br>(2-3-4-5-6 {">"} 3-4-5-6-7)
              
                               </li>
                               <li>Flush: any five cards with the same suit
                                 <br></br>- ranked by the suit (5 ♥'s {">"} 5 ♦'s), with highest value card being the tie-breaker (2 is largest)
                               </li>
                               <li>Full House: 3 same-value cards + a pair (ex: 4♦-4♣-4♠-9♦-9♣)
                                 <br></br>- ranked by value of the triples (2 is largest)
                               </li>
                               <li>Bomb: 4 same-value cards + a single (ex: 4♦-4♣-4♥-4♠-J♦)
                                 <br></br>- ranked by value of the 4 cards
                              </li>
                               <li>Straight Flush: a straight that's also a flush (ex: 3♠-4♠-5♠-6♠-7♠)
                                  <br></br>- ranked the same as straights, with suit being the tie breaker
                               </li>
                             </ul>
                           </li>
                         </ul>
                  
                </div>
    </div>
        </div>
    )
}

export default Collapsible
