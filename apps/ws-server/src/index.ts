import { WebSocketServer } from "ws"
import { client } from "@repo/db/client"

const server = new WebSocketServer({
    port: 3001,
    host: '0.0.0.0'
})

server.on("connection", async (socket) => {
    try {
        await client.user.create({
            data: {
                usename: Math.random().toString(),
                password: Math.random().toString()
            }
        })
        socket.send("Hi there you are connected to the server")
    } catch (error) {
        console.error("Database error:", error)
        socket.send("Connection established but database error occurred")
    }
})