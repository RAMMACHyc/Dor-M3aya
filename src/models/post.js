import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User',
    },
    
    title: { type: String, required: [true, "please"] },
    file: { type: String, required: [true, "please"] },
    likes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
})

const post = mongoose.model('Post', postSchema);
export default post 
