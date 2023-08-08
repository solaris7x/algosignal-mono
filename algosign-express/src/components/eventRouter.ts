import express from "express";
import * as jose from "jose";

import { hasAllProperties } from "../functions/hasAllProperties.js";
import EventModel from "../models/eventModel.js";

const eventRouter = express.Router();

export interface EventType {
    title: string;
    author: string;
    date: Date;
    body: string;
}

// JWT auth middleware
eventRouter.use(async (req, res, next) => {
    try {
        // Get the JWT token from request header cookie
        const token = req.cookies["token"];

        // Validate the JWT token
        if (!token) {
            throw new Error("No JWT token found");
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const alg = "HS256";

        const _jwtToken = await jose.jwtVerify(token, secret, {
            algorithms: [alg],
            issuer: "algosign",
        });

        return next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
});

eventRouter.post("/new", async (req, res) => {
    try {
        // Validate the event data
        if (
            !req.body ||
            !hasAllProperties<EventType>(req.body, ["title", "date", "body"])
        ) {
            return res.status(400).json({
                message: "Bad Request",
            });
        }

        // Get the event data from request body
        const { title, date, body } = req.body;

        // TODO: Get author username from JWT token

        // Create the event in DB
        const _newEvent = await new EventModel({
            title,
            author: "Test1",
            date,
            body,
        }).save();

        // Return the eventID
        return res.status(200).json({
            message: "Event created successfully",
            eventID: _newEvent._id,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

// Get the top 5 events from DB with pagination
eventRouter.get("/", async (req, res) => {
    try {
        // Get the page number from request query
        const page = Number(req.query.page) || 1;

        // Get the top 5 events from DB
        const events = await EventModel.find()
            .sort({ date: -1 })
            .limit(5)
            .skip((page - 1) * 5);

        return res.status(200).json({
            message: "Top 5 events",
            events,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

eventRouter.get("/:eventID", async (req, res) => {
    try {
        // Validate the eventID
        if (!req.params.eventID) {
            return res.status(400).json({
                message: "Bad Request",
            });
        }

        // Get the eventID from request params
        const { eventID } = req.params;

        // Get the event from DB
        const eventData = await EventModel.findById(eventID);

        // Return the event data
        return res.status(200).json({
            message: "Event data",
            eventData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

// Delete event
eventRouter.delete("/:eventID", async (req, res) => {
    try {
        // Validate the eventID
        if (!req.params.eventID) {
            return res.status(400).json({
                message: "Bad Request",
            });
        }

        // Get the eventID from request params
        const { eventID } = req.params;

        // Delete the event from DB
        const _deletedEvent = await EventModel.findByIdAndDelete(eventID);

        // Return the event data
        return res.status(200).json({
            message: "Event deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

export default eventRouter;
