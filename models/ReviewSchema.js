import mongoose from "mongoose";
import { UserSchema,BookingSchema } from "./index.js";

const reviewSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: UserSchema, required: true},
    booking:{type: mongoose.Schema.Types.ObjectId, ref: BookingSchema, required: true},
    rating:{ type: Number, required: true, min: 1, max: 5},
    review: { type: String, maxlength: 50},
    createdAt:{ type: Date, default: Date.now},
});

const ReviewSchema = mongoose.model('ReviewSchema', reviewSchema);
export default ReviewSchema;