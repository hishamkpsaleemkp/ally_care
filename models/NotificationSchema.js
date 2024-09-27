const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: {type:Schema.Types.ObjectId, ref:'User', required: true },
    message: {type: String, required: true},
    read: {type: Boolean, default: false},
    creaedAt: {type: Date, default: Date.now}
});

const NotificationSchema = mongoose.model('NotificationSchema',notificationSchema);
module.exports = NotificationSchema;