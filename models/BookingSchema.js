const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user : {type: Schema.Types.ObjectId, ref: 'User', required: true},
    service : {type: Schema.Types.ObjectId, ref: 'Services', required: true},
    package:{
        name:{type: String, required: true},
        price:{ type: Number, required: true}
    },
    addOns: [{
        name: {type: String},
        price: {type: Number},
        quantity: {type: Number}
    }],
    appointmentTime: {type: Date, required: true},
    location: {type:String},
    status: {type: String, enum:['upcoming','ongoing','completed'], default: 'upcoming'},
    totalPrice: {type: Number, required: true},
    paymentStatus: {type: String, enum: ['pending','paid'], default: 'pending'},
    createdAt: {type: Date, default: Date.now}
});


const BookingSchema = mongoose.model('BookingSchema',bookingSchema);
module.exports = BookingSchema;