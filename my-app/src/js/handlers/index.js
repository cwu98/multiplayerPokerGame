import socket from "../config";

export function handleCreateGame(clientId, playerName, gameName){
    const payload = {
        clientId: clientId,
        playerName: playerName,
        gameName: gameName
    }
    socket.emit("create", payload);
}

export function handleJoinGame(clientId, gid, playerName) {
    const payload = {
        clientId: clientId,
        gid: gid,
        playerName: playerName,
    }
    socket.emit("join", payload);
}

export function handleStartGame(clientId, gid) {
    const payload = {
        clientId: clientId,
        gid: gid
    }
    socket.emit("start", payload)
}

export function handleLeaveGame(clientId, gid){
    const payload = {
        clientId: clientId,
        gid: gid
    }
    socket.emit("leave", payload);
}

export function handlePlayCards(clientId, gid, playerHand, cards) {
    var newHand = playerHand.filter((card) => !cards.includes(card))
    const payload = {
        clientId: clientId,
        gid: gid,
        cards: cards,
        newHand: newHand
    };
    socket.emit("playCards", payload);
} 

export function handlePass(clientId, gid) {
    const payload = {
        clientId: clientId,
        gid: gid,
    }
    socket.emit("pass", payload);
}

export function handleNewGame(clientId, gid) {
    console.log('new game');
    const payload = {
        clientId: clientId,
        gid: gid
    }
    socket.emit('newgame', payload)
}