const mongoose = require('mongoose');
const BookingSchema = require('./BookingSchema');

const reviewSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    booking:{type: Schema.Types.ObjectId, ref: BookingSchema, required: true},
    rating:{ type: Number, required: true, min: 1, max: 5},
    review: { type: String, maxlength: 50},
    createdAt:{ type: Date, default: Date.now},
});

const ReviewSchema = mongoose.model('ReviewSchema', reviewSchema);
module.exports = ReviewSchema;