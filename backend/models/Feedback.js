const { Schema, model } = require('../connection');

const feedbackSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5']
    },
    comment: {
        type: String,
        required: true,
        minlength: [10, 'Comment must be at least 10 characters long'],
        maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

// Ensure a user can only give feedback once to another user
feedbackSchema.index({ sender: 1, receiver: 1 }, { unique: true });

module.exports = model('feedback', feedbackSchema);