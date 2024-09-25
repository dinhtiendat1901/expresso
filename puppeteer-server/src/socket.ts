import {Server} from "socket.io";
import {createServer} from "node:http";
import express from "express";


const app = express();
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
})

export {io, server, app}