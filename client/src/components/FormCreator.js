import { Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../Context';

const FormCreator = () => {
    const navigate = useNavigate();
    const [state, setState] = useContext(UserContext)
    const [typeQ, settypeQ] = React.useState('textfield');
    const [quedata, setQueData] = useState({ questiontitle: "", opt1: "", opt2: "", opt3: "", opt4: "" });
    const [ALlQuestion, setAllQuestion] = useState([])
    const [formtitle, setformtitle] = useState("")
    const handleInputs = (e) => {
        setQueData({ ...quedata, [e.target.name]: e.target.value });
    }
    const handleChange = (event) => {
        settypeQ(event.target.value);
    };
    const SubmitMcqQuestions = () => {
        if (quedata.questiontitle === '' || quedata.opt1 === '' || quedata.opt2 === '' || quedata.opt3 === '' || quedata.opt4 === '') {
            return
        }
        if (ALlQuestion.length == 5)
            toast.warn("Maximum limit reached to add question");
        else {
            quedata.typeQ = 'mcq';
            ALlQuestion.push(quedata);
            setQueData({ questiontitle: "", opt1: "", opt2: "", opt3: "", opt4: "" })
            console.log(ALlQuestion);

        }
    }
    const SubmitTextQuestion = () => {
        if (quedata.questiontitle === '')
            return;
        if (ALlQuestion.length == 5)
            toast.warn("Maximum limit reached to add question");
        else {
            quedata.typeQ = 'textfield'
            ALlQuestion.push({ username: state.user.name, questiontitle: quedata.questiontitle, typeQ: quedata.typeQ })
            setQueData({ formtitle: "", questiontitle: "", opt1: "", opt2: "", opt3: "", opt4: "" })
            console.log(ALlQuestion);
        }
    }

    const PostQuestion = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/postQuestion`, { formtitle: formtitle, username: state.user.name, questions: ALlQuestion })
            toast.success("Questions Posted Successfully");
            setQueData({ questiontitle: "", opt1: "", opt2: "", opt3: "", opt4: "" })
            setformtitle("");
            setAllQuestion([]);
            setTimeout(() => {
                toast.warn("Form Saved Succesfully");

            }, 2000);
            navigate("/choice")
        } catch (error) {
            toast.warn(error.message);
        }

    }
    return (
        <Container >
            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <Typography variant='h4' > Choose the type of question</Typography>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={typeQ}
                    onChange={handleChange}
                >
                    <FormControlLabel value="textfield" control={<Radio />} label="TextField" />
                    <FormControlLabel value="mcq" control={<Radio />} label="Multiple Choice Question" />
                </RadioGroup>
                <TextField id="standard-basic" label="Form title" variant="standard" sx={{ width: "80%" }} onChange={(e) => setformtitle(e.target.value)} value={formtitle} />

            </Box>
            {
                typeQ == 'textfield' ? <Container maxWidth={'md'}>
                    <TextField id="standard-basic" label="Question title" variant="standard" sx={{ width: "100%" }} onChange={(e) => setQueData({ ...quedata, questiontitle: e.target.value })} value={quedata.questiontitle} /> <br />
                    <Button variant='contained' sx={{ marginTop: "1rem" }} onClick={SubmitTextQuestion}>Add Question</Button>
                </Container> :
                    <Container maxWidth={'md'}>
                        <TextField id="standard-basic" label="Question title" variant="standard" name="questiontitle" sx={{ width: "100%" }} onChange={handleInputs} value={quedata.questiontitle} /> <br />
                        <TextField id="standard-basic" label="Option 1" variant="standard" name="opt1" onChange={handleInputs} value={quedata.opt1} /> <br />
                        <TextField id="standard-basic" label="Option 2" variant="standard" name="opt2" onChange={handleInputs} value={quedata.opt2} /> <br />
                        <TextField id="standard-basic" label="Option 3" variant="standard" name="opt3" onChange={handleInputs} value={quedata.opt3} /> <br />
                        <TextField id="standard-basic" label="Option 4" variant="standard" name="opt4" onChange={handleInputs} value={quedata.opt4} /> <br />
                        <Button variant='contained' sx={{ marginTop: "1rem" }} onClick={SubmitMcqQuestions} >Add Question</Button>
                    </Container>
            }
            <Container maxWidth="md">
                <Typography sx={{ textAlign: "center" }} variant={'h4'}>{formtitle}</Typography>
                {
                    ALlQuestion.map((que, index) => (
                        <Container maxWidth={'md'} sx={{
                            borderRadius: "0.4rem", background: "#f9fbff", marginTop: "1rem", border: " 2px solid #c2c2c2", padding: "1rem"
                        }}>
                            <Typography variant='h6' sx={{
                                padding: "0.51rem 2rem", marginTop: "1rem", background: "#d6d6d6", borderRadius: "0.3rem", border: "1px solid #9b9999"
                            }}>{index + 1 + ".\t"} {que.questiontitle}</Typography>
                            {que.typeQ == "mcq" ?
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"

                                >
                                    <FormControlLabel value={que.opt1} control={<Radio />} label={que.opt1} />
                                    <FormControlLabel value={que.opt2} control={<Radio />} label={que.opt2} />
                                    <FormControlLabel value={que.opt3} control={<Radio />} label={que.opt3} />
                                    <FormControlLabel value={que.opt4} control={<Radio />} label={que.opt4} />
                                </RadioGroup> :
                                <TextField id="standard-basic" label="Your answer" variant="standard" sx={{ width: "100%", marginTop: "1rem " }} />}
                        </Container>
                    ))
                }
            </Container>
            <ToastContainer position="top-center" theme="dark" /><Container maxWidth="md" sx={{ display: 'flex', justifyContent: "center" }}>
                {ALlQuestion.length > 0 ?
                    <Button variant={'contained'} sx={{ margin: "2rem 0", textAlign: "center" }} onClick={PostQuestion} >Post Questions to Database</Button> :
                    <Button variant={'contained'} sx={{ margin: "2rem 0", textAlign: "center" }} disabled>Post Questions to Database</Button>
                }</Container>
        </Container >
    )
}

export default FormCreator