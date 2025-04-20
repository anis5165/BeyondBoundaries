const Notification = require('../models/Notification');
const User = require('../models/userModel');

class NotificationService {
    static async createNotification(type, receiver, sender, data = {}) {
        try {
            const senderUser = await User.findById(sender);
            const notification = new Notification({
                type,
                receiver,
                sender,
                senderName: senderUser.name,
                data,
                timestamp: new Date()
            });

            await notification.save();

            // Get socket service and emit notification
            const socketService = global.app.get('socketService');
            if (socketService) {
                socketService.emitToUser(receiver, 'new_notification', notification);
            }

            return notification;
        } catch (error) {
            console.error('Error creating notification:', error);
            throw error;
        }
    }

    static async sendMessageNotification(receiverId, senderId) {
        return this.createNotification('message', receiverId, senderId);
    }

    static async sendConnectionRequest(receiverId, senderId) {
        return this.createNotification('connection_request', receiverId, senderId);
    }

    static async sendConnectionAccepted(receiverId, senderId) {
        return this.createNotification('connection_accepted', receiverId, senderId);
    }

    static async sendFeedbackNotification(receiverId, senderId) {
        return this.createNotification('feedback', receiverId, senderId);
    }

    static async sendMatchNotification(receiverId, senderId, matchScore) {
        return this.createNotification('match', receiverId, senderId, { matchScore });
    }

    static async markAsRead(notificationId) {
        try {
            const notification = await Notification.findByIdAndUpdate(
                notificationId,
                { read: true },
                { new: true }
            );
            return notification;
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    }

    static async markAllAsRead(userId) {
        try {
            const result = await Notification.updateMany(
                { receiver: userId, read: false },
                { read: true }
            );
            return result;
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
            throw error;
        }
    }

    static async getUnreadCount(userId) {
        try {
            const count = await Notification.countDocuments({
                receiver: userId,
                read: false
            });
            return count;
        } catch (error) {
            console.error('Error getting unread count:', error);
            throw error;
        }
    }

    static async getUserNotifications(userId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const notifications = await Notification.find({ receiver: userId })
                .sort({ timestamp: -1 })
                .skip(skip)
                .limit(limit);

            const total = await Notification.countDocuments({ receiver: userId });

            return {
                notifications,
                total,
                page,
                pages: Math.ceil(total / limit)
            };
        } catch (error) {
            console.error('Error getting user notifications:', error);
            throw error;
        }
    }

    static async deleteOldNotifications(daysOld = 30) {
        try {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - daysOld);

            const result = await Notification.deleteMany({
                timestamp: { $lt: cutoffDate },
                read: true
            });

            return result;
        } catch (error) {
            console.error('Error deleting old notifications:', error);
            throw error;
        }
    }
}

module.exports = NotificationService;