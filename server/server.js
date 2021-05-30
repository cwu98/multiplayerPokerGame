const express = require("express")
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server,{ cors:{origin: "*"}})
const port = 8080;
const {generateId, shuffle, initState, sortCards}  = require("./helpers")
const deck = require("./constants")

var clientRooms = {}
var states = {}

io.on('connection', (socket) => {
    console.log('A user connected with id:', socket.id)
    const data = {
        clientId: socket.id
    }
    socket.emit("connected", data)
    socket.emit('getGamesList', states)
    socket.on('join', handleJoinGame);
    socket.on('create', handleCreateGame);
    socket.on('getGamesList', handleGetGamesList);
    socket.on('start', handleStartGame)

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
        socket.emit('created', payload)
        socket.emit('update', payload)
        states[gameId] = state
        socket.join(gameId)
    } 

    function handleGetGamesList(msg){
        console.log(msg)
        socket.emit('getGamesList', states)
    }

    function handleJoinGame(payload){
        let game = states[payload.gid]
        if (game) {
            game.players[payload.clientId] = {
                playerName: payload.playerName
            }
            game.clientIds.push(payload.clientId)
            clientRooms[data.clientId] = payload.gid;
            
            socket.join(payload.gid)
            let res = {
                clientId: payload.clientId,
                gameState: game,
                currentGid: payload.gid
            }
            io.emit('update', res)
            socket.emit('joined', payload)
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
          // Object.keys(gameState.players).length
        let cardsPerPlayer = Math.floor(52/4)
        let i = 0
        Object.keys(gameState.players).forEach((cid) => {
            gameState.players[cid].hand = sortCards(shuffledDeck.slice(i*cardsPerPlayer, (i+1)*cardsPerPlayer))
            i++;
        })
        io.sockets.in(gameId).emit('update', res)
    }

    socket.on('disconnet', function(){
        console.log("socket disconnected")
    })
})



io.listen(port)