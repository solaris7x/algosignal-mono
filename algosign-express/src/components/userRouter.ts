// Express js router for user related requests
import express from "express";
import * as jose from "jose";
import Users, { UserModel } from "../models/userModel.js";
import loginBodyValidator from "../functions/loginBodyValidator.js";

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

        // Check if the user already exists in array
        const checkUser = Users.some((x) => x.email === email);
        if (checkUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        // Create the user in DB
        const newUser: UserModel = {
            username,
            email,
            passwordHash,
        };

        Users.push(newUser);
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
            .setExpirationTime(process.env.JWT_EXPIRY || "12h")
            .sign(secret);

        // Set token as HTTP-only cookie
        res.cookie("token", jwtToken, {
            httpOnly: true,
            sameSite: "strict",
            // secure: true, // For https
            maxAge: parseInt(
                process.env.COOKIE_EXPIRY?.toString() || "43200000"
            ), // 12 hours same as JWT expiry
        });

        return res.status(200).json({
            message: "User registered successfully",
            username,
            email,
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
        const userInfo = await loginBodyValidator(req.body);

        // Return the JWT token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const alg = "HS256";

        const jwtToken = await new jose.SignJWT({
            username: userInfo.username,
            email: userInfo.email,
        })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer("algosign")
            .setExpirationTime(process.env.JWT_EXPIRY || "12h")
            .sign(secret);

        // Set token as HTTP-only cookie
        res.cookie("token", jwtToken, {
            httpOnly: true,
            sameSite: "strict",
            // secure: true, // For https
            maxAge: parseInt(
                process.env.COOKIE_EXPIRY?.toString() || "43200000"
            ), // 12 hours same as JWT expiry
        });

        return res.json({
            message: "User logged in successfully",
            username: userInfo.username,
            email: userInfo.email,
        });
    } catch (err: any) {
        console.error(err);
        if (err?.message && err?.status) {
            return res.status(err.status).json({ message: err.message });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }
});

userRouter.get("/logout", async (req, res) => {
    try {
        // Clear the cookie
        res.clearCookie("token");

        return res.json({ message: "User logged out successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

// Update password
userRouter.post("/updatePassword", async (req, res) => {
    try {
        // Validate the user data
        const userInfo = await loginBodyValidator(req.body);

        if (!req.body?.newPasswordHash) {
            throw {
                message: "Bad Request",
                status: 400,
            };
        }

        // console.log(req.body);

        // Get cookie from request
        const { token } = req.cookies;
        // console.log(token);

        // Validate the JWT token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const alg = "HS256";

        const jwtToken = await jose.jwtVerify(token, secret, {
            algorithms: [alg],
            issuer: "algosign",
        });

        // Check if the email in JWT token and request body are same
        if (jwtToken.payload.email !== userInfo.email) {
            throw {
                message: "Unauthorized: Email mismatch",
                status: 401,
            };
        }

        // Update the passwordHash in array
        const { newPasswordHash } = req.body;
        const updateUserIndex = Users.findIndex(
            (x) => x.email === userInfo.email
        );
        Users[updateUserIndex].passwordHash = newPasswordHash;

        // console.log(_updatedUser);

        return res.json({
            message: "Password updated successfully",
            username: userInfo.username,
            email: userInfo.email,
        });
    } catch (err: any) {
        console.error(err);
        if (err?.message && err?.status) {
            return res.status(err.status).json({ message: err.message });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }
});

export default userRouter;
