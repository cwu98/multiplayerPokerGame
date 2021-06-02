export const suits = ["diamonds", "clubs", "hearts", "spades"];
export const ranks = [
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
  ranks.indexOf(a.rank) - ranks.indexOf(b.rank);

export const sortCards = (hand) => {
    const sortedHand = [...hand.sort(sortBySuit).sort(sortByRank)]
    setHand(sortedHand);
}

const playerPassed = (gameState, clientId) => {
  return gameState.players[clientId].pass;
}

// returns the clientId of the winner
export const getWinner = (gameState) => {
  for(let cId in gameState.clientIds){
    if(gameState.players[cId].length === 0){
      return cId
    }
  }
    return null
}

// Game ends when a player has 0 cards remaining
export const gameOver = (gameState) => {
  var emptyHands = gameState.clientIds.filter((cId) => gameState.players[cId].hand.length == 0)
  return emptyHands > 0;
}

// player has freebie when all players pass or
export const freebie = (gameState) => {
  const {clientIds} = gameState;
  return (
    clientIds.filter((cId) => playerPassed(gameState, cId)) === clientIds.length
  )
}

