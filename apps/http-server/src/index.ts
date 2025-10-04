import express from "express"
import { client } from "@repo/db/client"

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hi There");
})

app.post("/signup", async (req, res) => {
    try {
        console.log("Request body:", req.body);

        const username = req.body.username || req.body.user;
        const password = req.body.password;

        if (!username || !password) {
            return res.status(400).json({
                error: "Username and password are required",
                received: req.body
            });
        }

        const user = await client.user.create({
            data: {
                usename: username,
                password: password
            }
        })

        res.json({
            message: "sign up succesfull",
            id: user.id
        })
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
})
app.listen(3002)