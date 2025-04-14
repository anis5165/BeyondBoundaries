const { Schema, model } = require('../connection');

const messageSchema = new Schema({
    text: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    senderName: { type: String, required: true },
    chatRoom: { type: String, required: true }, // Unique identifier for each chat
    timestamp: { type: Date, default: Date.now }
});

module.exports = model('message', messageSchema);