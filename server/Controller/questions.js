import Question from "../Models/questionSchema.js";
import Answer from "../Models/answerSchema.js";

export const postQuestion = async (req, res) => {
    const quebody = req.body;
    try {
        const que = await new Question(quebody);
        await que.save();
        return res.status(200).json({ "message": "Question added successfully" });

    } catch (error) {
        return res.status(400).json({ "message": error.message });
    }
}

export const getQuestion = async (req, res) => {
    try {
        const que = await Question.find();
        return res.status(200).send(que);

    } catch (error) {
        return res.status(400).json({ "message": error.message });
    }
}

export const getQuestionbyId = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.params);
        const que = await Question.findById(id);
        return res.status(200).send(que);
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const sendResponse = async (req, res) => {
    try {
        const body = req.body;
        const ans = await new Answer(body);
        ans.save();
        return res.status(200).json({ message: "Responses saved Successfully" })
    } catch (error) {
        return res.status(200).json({ message: error.message })

    }
}