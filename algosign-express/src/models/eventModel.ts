import mongoose, { Schema } from "mongoose";

const EventModelSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const EventModel = mongoose.model("Events", EventModelSchema);
export default EventModel;
