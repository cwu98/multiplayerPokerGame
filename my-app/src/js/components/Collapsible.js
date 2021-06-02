import react from "react";

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
        <div class="wrap-collabsible">
            <input id="collapsible" class="toggle" type="checkbox"/>
            <label for="collapsible" class="lbl-toggle">Rules</label>
            <div class="collapsible-content">
                <div class="content-inner">
                    <p><pre className="pre">
                         There are variants to this game so feel free to play according to your own rules.<br></br>
                         Cards can be played as singles, pairs, or in a group of 5 cards. (Other variations allow triplets.)<br></br>
                         Orders(value): 3  4  5  6  7  8  9  10  J  Q  K  A  2 (3 is smallest, 2 is largest) <br></br>
                         Orders(suits): diamonds ♦   clubs ♣   hearts ♥   spades ♠ (♦ is smallest, ♠ is largest) <br></br>
                         Rankings: <br></br>
                         <ul>
                           <li>Singles: ranked by value with suit being the tie breaker. (A♠ {">"} A♥ {">"} K♠)</li>
                           <li>Pairs: ranked by value of the two matching cards, with the larger suit being the tie-breaker. (8♠ 8♣ {">"} 8♥ and 8♦.)</li>
                           <li>Five-card hands: 
                             <ul>
                               <li>Straight: any five cards in a sequence (ex: A-2-3-4-5, 10-J-Q-K-A)
                                 <p>- ranked by value of the biggest card, with suit of that card being the tie-breaker
                                 <br></br>(2-3-4-5-6 {">"} 3-4-5-6-7)
                                 </p>
                               </li>
                               <li>Flush: any five cards with the same suit</li>
                                <p>- ranked by the suit (5 ♥'s {">"} 5 ♦'s), with highest value card being the tie-breaker (2 is largest)</p>
                               <li>Full House: 3 same-value cards + a pair (ex: 4♦-4♣-4♠-9♦-9♣)</li>
                               <p>- ranked by value of the triples (2 is largest)</p>
                               <p></p>
                               <li>Bomb: 4 same-value cards + a single (ex: 4♦-4♣-4♥-4♠-J♦)</li>
                               <p>- ranked by value of the 4 cards</p>
                               <li>Straight Flush: a straight that's also a flush (ex: 3♠-4♠-5♠-6♠-7♠)</li>
                               <p>- ranked the same as straights, with suit being the tie breaker</p>
                               <p></p>
                             </ul>
                           </li>
                         </ul>
                        </pre>
                    </p>
                </div>
    </div>
        </div>
    )
}

export default Collapsible
