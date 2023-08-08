import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import userRouter from "./components/userRouter.js";
import mongoose from "mongoose";

const index = async () => {
    try {
        const app = express();
        const port = 3000;

        // try to connect to DB
        const connectionString =
            process.env.ATLAS_URI ||
            "mongodb+srv://<username>:<password>@cluster0.mongodb.net/algosign?retryWrites=true&w=majority";
        await mongoose.connect(connectionString);

        // Handle cors
        app.use(
            cors({
                credentials: true,
                origin: "http://localhost:5173",
            })
        );

        // Parse cookies for this app. Using express built-in middleware
        app.use(cookieParser());

        // Parse JSON bodies for this app. Using express built-in middleware
        app.use(express.json());

        app.get("/", async (req, res) => {
            return res.send("Hello World! from algosign");
        });

        app.use("/user", userRouter);

        // Catch all other routes
        app.all("*", (req, res) => {
            return res.status(404).send("Not Found");
        });

        app.listen(port, () => {
            console.log(`Listening on port ${port} 🚀🚀`);
        });
    } catch (error) {
        console.error(error);
        console.error("Failed starting the server");
    }
};

index();
