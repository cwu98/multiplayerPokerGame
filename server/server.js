const express = require('express');
const http = require('http');
const port = 8080;
const server = http.createServer(express);
const io = require("socket.io")({ cors:{origin: "*"}})
const { generateId } = require("./helpers.js")
const { initGameState } = require("./game.js")

var clientRooms = {}
var states = {}

io.on('connection', (socket) => {
    console.log('A user connected with id:', socket.id)
    /*
    socket.on('create', handleCreateGame);
    const data = {
        clientId: socket.id
    }
    socket.emit(data)

    function handleCreateGame(){
        console.log("create")
        let state = {}
        let gameId = generateId(8);
        clientRooms[socket.id] = gameId;
        let data = {
            clientId: socket.id,
            gameState: state,
            currentGid: gameId
        }
        socket.emit('create', data)
        states[gameId] = state
        socket.join(gameId)
    } */
})


io.listen(port, () => {
    console.log("listening on port:",port)
})