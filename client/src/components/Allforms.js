import { Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Allforms = () => {
    useEffect(() => {
        getQuestion();
    }, [])
    const [question, setQuestion] = useState([]);
    const getQuestion = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/getquestion`)
        setQuestion(data);
    }
    return (
        <Container maxWidth={'lg'} >
            <Typography variant='h4' sx={{ textAlign: "center", marginTop: "2rem" }}>Select the one of the following forms</Typography>
            <Grid container justifyContent={'center'} spacing={5} sx={{ minHeight: "100vh", alignItems: "center" }}>
                {
                    question.map((que, index) => (<Grid item xs={4}><Link to={`/response/${que._id}`} >
                        <Box sx={{ background: index & 1 ? "#f44336" : " #673ab7", display: "flex", alignItems: "center", justifyContent: "center", height: "16rem", borderRadius: "1rem" }}>
                            <Typography variant='h3' sx={{ color: 'white' }}>{que.formtitle}</Typography>
                        </Box>
                    </Link>
                    </Grid>))
                }

            </Grid >
        </Container>
    )
}

export default Allforms