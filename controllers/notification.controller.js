import { NotificationSchema } from "../models/index.js";

const createNotification = async (req, res) => {
    const { user, message } = req.body;
  
    try {
      const newNotification = new NotificationSchema({
        user,
        message,
      });
  
      const savedNotification = await newNotification.save();
      res.status(201).json(savedNotification);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create notification', error });
    }
};



const getUserNotifications = async (req, res) => {
    try {
      const notifications = await NotificationSchema.find({ user: req.params.userId });
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch notifications', error });
    }
};



const markNotificationAsRead = async (req, res) => {
    try {
      const notification = await NotificationSchema.findByIdAndUpdate(
        req.params.id,
        { read: true },
        { new: true }
      );
  
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update notification', error });
    }
};



const deleteNotification = async (req, res) => {
    try {
      const deletedNotification = await NotificationSchema.findByIdAndDelete(req.params.id);
  
      if (!deletedNotification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete notification', error });
    }
};



export {
    createNotification,
    getUserNotifications,
    markNotificationAsRead,
    deleteNotification
}
  
  
  