const express = require("express")
const app = express()
const cors = require('cors');
app.use(cors());
const http = require('http')
const path = require('path')
const server = http.createServer(app)
const io = require('socket.io')(server,{ cors:{origin: "*"}})
const port = 8080;
const {generateId, shuffle, initState, sortCards, getStartPlayer}  = require("./helpers")
const deck = require("./constants")
const router = require('./src/router')

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(router);
var clientRooms = {}
var states = {}

io.on('connection', (socket) => {
    console.log('A user connected with id:', socket.id)

    socket.emit("connected", { clientId: socket.id })
    socket.on('join', handleJoinGame);
    socket.on('create', handleCreateGame);
    socket.on('getGamesList', handleGetGamesList);
    socket.on('start', handleStartGame);
    socket.on('leave', handleLeaveGame);
    socket.on('pass', handlePlayerPass);
    socket.on('playCards', handlePlayCards);
    socket.on('newgame', handleNewGame);
    socket.on('disconnect', function(){
        console.log("socket disconnected",socket.id)
        if(clientRooms[socket.id]) {
            const gameId = clientRooms[socket.id]
            const payload = {
                clientId: socket.id,
                gid: gameId
            }
            handleLeaveGame(payload)
        }
    })

    /** HANDLERS **/
    function handleCreateGame(data){
        let state = new initState();
        state.gameName = data.gameName;
        state.host = data.clientId
        let gameId = generateId(8);
        state.id = gameId
        state.clientIds.push(data.clientId)
        state.players[data.clientId] = {
            playerName: data.playerName
        }
        clientRooms[data.clientId] = gameId;
        let payload = {
            clientId: data.clientId,
            gameState: state,
            currentGid: gameId
        }
        socket.join(gameId)
        states[gameId] = state
        io.sockets.in(gameId).emit('created', payload)
        io.sockets.in(gameId).emit('update', payload)
    } 

    function handleGetGamesList(){
        socket.emit('getGamesList', states)
    }

    function handleJoinGame(payload){
        let game = states[payload.gid]
        if (game) {
            game.players[payload.clientId] = {
                playerName: payload.playerName
            }
            game.clientIds.push(payload.clientId)
            clientRooms[payload.clientId] = payload.gid;
            
            socket.join(payload.gid)
            let res = {
                clientId: payload.clientId,
                gameState: game,
                currentGid: payload.gid
            }
            io.sockets.in(payload.gid).emit('update', res)
            io.sockets.in(payload.gid).emit('joined', payload)
        } else {
            console.log("game is undefined")
        }
    }
    
    function handleStartGame(payload){
        const gameId = payload.gid
        let gameState = states[gameId]
        gameState.startGame = true;
        let res = {
            clientId: payload.clientId,
            gameState: gameState,
            currentGid: gameId
        }
        let shuffledDeck = shuffle(deck)
        let cardsPerPlayer = Math.floor(52/gameState.clientIds.length);
        let i = 0
        Object.keys(gameState.players).forEach((cid) => {
            gameState.players[cid].hand = sortCards(shuffledDeck.slice(i*cardsPerPlayer, (i+1)*cardsPerPlayer))
            i++;
        })
        const startingPlayer = getStartPlayer(gameState)
        gameState.currentPlay = [];
        gameState.playerTurn.clientId = gameState.clientIds[startingPlayer];
        gameState.playerTurn.index = startingPlayer;
        io.sockets.in(gameId).emit('update', res)
    }

    function handleLeaveGame(payload){
        const cId = payload.clientId;
        const gameId = payload.gid;
        if (clientRooms[cId]){
            console.log(`${cId} left.`)
            delete clientRooms[cId]
        }
        if (states[gameId]?.players[cId]) {
            if(states[gameId].host == cId && states[gameId].host === states[gameId].clientIds[0]) {
                states[gameId].clientIds.shift();
                states[gameId].host = states[gameId].clientIds[0]
                console.log("host leaving game")
                console.log("assign random host")
            }
            delete states[gameId].players[cId];
        }
        states[gameId].startGame=false;
        let res = {
            clientId: cId,
            gameState: states[gameId],
            currentGid: gameId
        }
        io.sockets.in(gameId).emit('update', res)
    }

    function handlePlayerPass(payload) {
        const cId = payload.clientId;
        const gameId = payload.gid;
        const gameState = states[gameId];
        gameState.players[cId].pass = true;
        var nextIndex = (states[gameId].playerTurn.index + 1) % gameState.clientIds.length
        var nextcId = gameState.clientIds[nextIndex];
        gameState.playerTurn.clientId = nextcId;
        gameState.playerTurn.index = nextIndex;
        let res = {
            clientId: cId,
            gameState: gameState,
            currentGid: gameId
        }
        io.sockets.in(gameId).emit('update', res);
    }


    function handlePlayCards(payload) {
        const cId = payload.clientId
        const gameId = payload.gid
        const gameState = states[gameId]
        if(!gameState){
            return
        }
        const cards = payload.cards
        gameState.players[cId].hand = payload.newHand
        gameState.currentPlay = cards;
        //edge case: player plays spade 2, gets to go again
        if(!(cards.length == 1 && (cards[0].value === '2' && cards[0].suit === 'spades'))) {
            var nextIndex = (states[gameId].playerTurn.index + 1) % gameState.clientIds.length
            var nextcId = gameState.clientIds[nextIndex];
            gameState.playerTurn.clientId = nextcId;
            gameState.playerTurn.index = nextIndex;
        } 
        let res = {
            clientId: cId,
            gameState: gameState,
            currentGid: gameId
        }
        if (!gameState.winner && gameState.players[cId].hand.length === 0){
            gameState.winner = cId;
            gameState.gameEnd = true;        
        }
        io.sockets.in(gameId).emit('update', res);
    }

    function handleNewGame(payload){
        states[payload.gid].winner = "";
        handleStartGame(payload);
    }
    
})



//io.listen(port)
server.listen(port);