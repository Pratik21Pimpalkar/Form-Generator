import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../Context';
import { Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system'
import { Navigate, useNavigate, useParams } from 'react-router-dom';


const Response = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [state, setState] = useContext(UserContext)
    const [res, setRes] = useState()
    const [question, setQuestion] = useState({ questions: [] });
    const [AllResponse, setAllResponse] = useState([]);
    useEffect(() => {
        getQuestion();
    }, [])

    const getQuestion = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/getquestion/${id}`)
        setQuestion(data);
    }
    const handleChange = (e) => {
        setRes({ ...res, [e.target.name]: e.target.value });
        console.log(res);
    }
    const SubmitResponse = async () => {
        const arr = Object.values(res);
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/sendResponse`, {
                username: question.username, questions: question?.questions, formtitle: question.formtitle, response: {
                    answers: arr, resUsername: state.user.name
                }
            })
            toast.success("Responses saved Succesfully")
            setTimeout(() => {
                navigate("/choice")
            }, 3000);
        } catch (error) {
            toast.error(error.message)
        }

    }
    return (
        <Container maxWidth="lg">
            <Typography variant='h5' sx={{ textAlign: "center", marginTop: "2rem" }} > {state.user.name + " "},Please Submit Your Response</Typography>
            <Typography variant='h4' sx={{ textAlign: "center", marginTop: "2rem" }} > {question?.formtitle}</Typography>
            {
                question.questions.map((que, index) => (
                    <Container maxWidth={'md'} sx={{
                        borderRadius: "0.4rem", background: "#f9fbff", marginTop: "1rem", border: " 2px solid #c2c2c2", padding: "1rem"
                    }} key={que._id}>
                        <Typography variant='h6' sx={{
                            padding: "0.51rem 2rem", marginTop: "1rem", background: "#d6d6d6", borderRadius: "0.3rem", border: "1px solid #9b9999"
                        }}>{index + 1 + ".\t"} {que.questiontitle}{que.formtitle}</Typography>
                        {que.type == "mcq" ?
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                onChange={handleChange}
                                name={`radio${index + 1}`}
                            >
                                <FormControlLabel value={que.opt1} control={<Radio />} label={que.opt1} />
                                <FormControlLabel value={que.opt2} control={<Radio />} label={que.opt2} />
                                <FormControlLabel value={que.opt3} control={<Radio />} label={que.opt3} />
                                <FormControlLabel value={que.opt4} control={<Radio />} label={que.opt4} />
                            </RadioGroup> :
                            <TextField id="standard-basic" label="Your answer" variant="standard" sx={{ width: "100%", marginTop: "1rem " }} name={`answer${index + 1}`} onChange={handleChange} />}
                    </Container>
                ))
            }
            <Box sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
                <Button variant={'contained'} onClick={SubmitResponse}>Submit Response to Database</Button> :
            </Box>
            <ToastContainer position="top-center" theme={"dark"} autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </Container >
    )
}

export default Response