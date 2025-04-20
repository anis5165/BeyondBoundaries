const { Schema, model } = require('../connection');

const connectionSchema = new Schema({
    businessOwnerId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    partnerId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    initiator: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    message: {
        type: String
    },
    connectedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create compound index for faster queries
connectionSchema.index({ businessOwnerId: 1, partnerId: 1 }, { unique: true });

module.exports = model('connection', connectionSchema);