import socketIOClient from "socket.io-client"
let HOST = 'http://localhost:8080';

const socket = socketIOClient(HOST, {
    'sync disconnect on unload': true
})


socket.on("connect", () => [
])

export default socket;
