import mongoose, { model, Schema } from 'mongoose';

// Schema for a single MCQ
const mcqSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String], // Array of 4 options
        required: true,

    },
    correct_answer: {
        type: String,
        required: true,
    }
});

// Schema for the Story collection
const storySchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    story_text: {
        type: String,
        required: true,
    },
    mcqs: {
        type: [mcqSchema],
        required: true,
        
    },
    category: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const Story = mongoose.models.Story || model('Story', storySchema);