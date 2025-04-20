const { Schema, model } = require('../connection');

const notificationSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: [
            'message',
            'connection_request',
            'connection_accepted',
            'feedback',
            'match'
        ]
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    data: {
        type: Schema.Types.Mixed,
        default: {}
    },
    read: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create index for faster queries on receiver and read status
notificationSchema.index({ receiver: 1, read: 1 });
notificationSchema.index({ timestamp: -1 });

module.exports = model('notification', notificationSchema);