import React, { useState, useContext } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../Context/index'
import { useNavigate } from "react-router-dom";

const UserLogin = ({ handleToggle }) => {
    const [userdata, setUserData] = useState({ name: "", password: "" })
    const [state, setState] = useContext(UserContext)
    const navigate = useNavigate()

    const HandleInputs = (e) => {
        let key, value;
        key = e.target.name;
        value = e.target.value;
        setUserData({ ...userdata, [key]: value })
    }

    const SubmitUserdata = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/login`, userdata)
            setUserData({ name: "", password: "" })
            setState({
                user: data.user,
                token: data.token
            })
            window.localStorage.setItem('auth', JSON.stringify(data))
            toast.success("User login Succesfully")
            setTimeout(() => {
                navigate("/choice")
            }, 1500);

        } catch (error) {
            toast.success("Something went wrong")
            console.log(error);
        }
    }


    return (
        <Container maxWidth={'sm'}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5' align="center" > Login Here</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="filled-basic" label="User Name" name="name" value={userdata.name} onChange={HandleInputs} variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12}>
                    <TextField id="filled-basic" label="Password" name="password" type="password" value={userdata.password} onChange={HandleInputs} variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button variant='outlined' onClick={SubmitUserdata}>Login</Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='caption' style={{ cursor: "pointer", color: "blue" }} onClick={handleToggle}>Don't have an account? Registered here!</Typography>
                </Grid>
                <ToastContainer position="top-center" theme={"dark"} autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />
            </Grid>
        </Container>
    )
}

export default UserLogin