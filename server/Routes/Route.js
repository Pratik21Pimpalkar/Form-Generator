import express from 'express'
import { loginUser, registerUser, currentUser } from '../Controller/Auth.js';
import { postQuestion, getQuestion, getQuestionbyId, sendResponse } from '../Controller/questions.js';
const router = express.Router();


router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/current', currentUser)
router.post("/postquestion", postQuestion)
router.get("/getquestion", getQuestion)
router.get("/getquestion/:id", getQuestionbyId)
router.post("/sendResponse", sendResponse)

export default router