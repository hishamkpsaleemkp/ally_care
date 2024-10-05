import mongoose from "mongoose";
import { UserSchema } from "./index.js";

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: UserSchema, required: true },
    message: {type: String, required: true},
    read: {type: Boolean, default: false},
    creaedAt: {type: Date, default: Date.now}
});

const NotificationSchema = mongoose.model('NotificationSchema',notificationSchema);
export default NotificationSchema;