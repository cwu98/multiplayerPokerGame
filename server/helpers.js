function generateId(length) {
    let result = '';
    let characters = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for(let i = 0; i < length; i++){
        let index = Math.floor(Math.random()*characters.length)
        result += characters.charAt(index);
    }
    return result;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
  
    return array;
  }

function initState() {
  return {
    gameName: "",
    players: {},
    clientIds: [],
    host: undefined,
    id: undefined,
    startGame: false,
    playerTurn: {},
    currentPlay: [],
    winner: "",
    gameEnd: false
  }
}

const suits = ["diamonds", "clubs", "hearts", "spades"];
const ranks = [
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
  "2",
];


//comparator to sort cards based on suit in ascending order
const sortBySuit = (a, b) =>
    suits.indexOf(a.suit) - suits.indexOf(b.suit);

//comparator to sort cards based on rank in ascending order
const sortByRank = (a, b) =>
  ranks.indexOf(a.value) - ranks.indexOf(b.value);

const sortCards = (hand) => {
    const sortedHand = [...hand.sort(sortBySuit).sort(sortByRank)]
    return sortedHand
}

// get player that has diamond 3, this player goes first
const getStartPlayer = (gameState) => {
  for(let i = 0; i < gameState.clientIds.length; i++){
    let cId = gameState.clientIds[i];
    for(let j = 0; j < gameState.players[cId].hand.length; j++){
      let card = gameState.players[cId].hand[j];
      if(card.suit === "diamonds" && card.value === "3"){
        return i;
      }
    }
  }
}



module.exports = {
    generateId,
    shuffle,
    initState,
    sortCards,
    getStartPlayer,
    suits,
    ranks
}