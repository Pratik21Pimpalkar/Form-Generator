import mongoose from "mongoose";
const { Schema } = mongoose;

const QuestionSchema = Schema({
    username: {
        type: String,
        required: "Username is required"
    },
    formtitle: {
        type: String,
        required:"Title required"
    },
    questions: [{
        questiontitle: {
            type: String,
            required: "Question Title is required",
            trim: true
        },
        opt1: { type: String, trim: true },
        opt2: { type: String, trim: true },
        opt3: { type: String, trim: true },
        opt4: { type: String, trim: true },
        postedOn: { type: Date, default: Date.now },
    }]
})



const Question = mongoose.model("Question", QuestionSchema);
export default Question;