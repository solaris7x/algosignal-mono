import express from "express";
import * as jose from "jose";

import { hasAllProperties } from "../functions/hasAllProperties.js";
import Events, { EventModel } from "../models/eventModel.js";
import generateSHA256 from "../functions/generateSHA256.js";

const eventRouter = express.Router();

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

        req.body.author = `${_jwtToken.payload.email || token}`;

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
            !hasAllProperties<EventModel>(req.body, ["title", "date", "body"])
        ) {
            return res.status(400).json({
                message: "Bad Request",
            });
        }

        // Get the event data from request body
        // Get author username from JWT token
        const { title, date, author, body } = req.body;

        // Create the event in DB
        const _newEvent: EventModel = {
            _id: generateSHA256(
                new Date().getTime().toString() + title + author
            ),
            title,
            author,
            date,
            body,
        };

        Events.push(_newEvent);

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
        // const page = Number(req.query.page) || 1;
        // console.log(Events);

        // Get the top 5 events from array
        const events = Events;
        // .slice((page - 1) * 5, page * 5);

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

        // Get the event from array
        const eventData = Events.find((event) => event._id === eventID);

        if (!eventData) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

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

        // Delete the event from array
        const index = Events.findIndex((obj) => obj._id === eventID);
        if (index !== -1) {
            Events.splice(index, 1);
        }

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
