import mongoose from "mongoose";
import { UserSchema, ServicesSchema } from "./index.js";

const bookingSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: UserSchema , required: true},
    service : {type: mongoose.Schema.Types.ObjectId, ref: ServicesSchema , required: true},
    addOns: [{
        name: {type: String},
        price: {type: Number},
        quantity: {type: Number}
    }],
    appointmentTime: {type: Date, required: true},
    location: {type:String},
    status: {type: String, enum:['upcoming','ongoing','completed'], default: 'upcoming'},
    totalPrice: {type: Number, required: true},
    advance: { type: Number, required: true},
    paymentStatus: {type: String, enum: ['pending','paid','partial'], default: 'pending'},
    createdAt: {type: Date, default: Date.now}
});


const BookingSchema = mongoose.model('BookingSchema',bookingSchema);
export default BookingSchema;