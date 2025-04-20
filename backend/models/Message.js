const { mongoose } = require('mongoose');
const { Schema, model, Types } = require('../connection');

const messageSchema = new Schema({
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    receiver: { 
        type: Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    text: { 
        type: String,
        required: true 
    },
    senderName: { 
        type: String, 
        required: true 
    },
    chatRoom: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    read: { 
        type: Boolean, 
        default: false 
    }
});

// Create index for faster chat room queries
messageSchema.index({ chatRoom: 1 });

module.exports = model('message', messageSchema);