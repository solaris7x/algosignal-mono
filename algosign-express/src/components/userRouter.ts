// Express js router for user related requests
import express from "express";
import * as jose from "jose";
import UserModel from "../models/userModel.js";

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    try {
        // Validate the user data
        if (
            !req.body ||
            !req.body?.username ||
            !req.body?.email ||
            !req.body?.passwordHash
        ) {
            return res.status(400).json({
                message: "Bad Request",
            });
        }

        // Get the user data from request body
        const { username, email, passwordHash } = req.body;

        // Check if the user already exists in DB
        const checkUser = await UserModel.findOne({ email }).exec();
        if (checkUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        // Create the user in DB
        const newUser = new UserModel({
            username,
            email,
            passwordHash,
        });

        const _savedUser = await newUser.save();
        // console.log(_savedUser);

        // Return the JWT token
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET || "secret"
        );
        const alg = "HS256";

        const jwtToken = await new jose.SignJWT({ email })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer("algosign")
            .setExpirationTime("12h")
            .sign(secret);

        // Set token as HTTP-only cookie
        res.cookie("token", jwtToken, {
            httpOnly: true,
            sameSite: "strict",
            // secure: true, // For https
            maxAge: 43200, // 12 hours same as JWT expiry
        });

        return res.status(200).json({
            message: "User registered successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        // Validate the user data
        if (!req.body || !req.body?.email || !req.body?.passwordHash) {
            return res.status(400).json({ message: "Bad Request" });
        }

        // Get the user data from request body
        const { email, passwordHash } = req.body;

        // Check if the user exists in DB
        const userInfo = await UserModel.findOne({ email }).exec();
        if (!userInfo) {
            return res.status(401).json({ message: "User does not exist" });
        }

        // Check if the passwordHash is correct
        if (userInfo.passwordHash !== passwordHash) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Return the JWT token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const alg = "HS256";

        const jwtToken = await new jose.SignJWT({ email })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer("algosign")
            .setExpirationTime("12h")
            .sign(secret);

        // Set token as HTTP-only cookie
        res.cookie("token", jwtToken, {
            httpOnly: true,
            sameSite: "strict",
            // secure: true, // For https
            maxAge: 43200, // 12 hours same as JWT expiry
        });

        return res.json({ message: "User logged in successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

userRouter.post("/logout", async (req, res) => {
    try {
        // Clear the cookie
        res.clearCookie("token");

        return res.json({ message: "User logged out successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

export default userRouter;
