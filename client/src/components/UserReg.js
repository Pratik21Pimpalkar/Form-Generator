import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { Button, Container, Grid, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserReg = ({ handleToggle }) => {
    const [userdata, setUserData] = useState({ name: "", password: "", cpassword: "", age: "", address: "" })
    const HandleInputs = (e) => {
        let key, value;
        key = e.target.name;
        value = e.target.value;
        setUserData({ ...userdata, [key]: value })
    }
    const SubmitUserdata = async () => {
        try {
            const data = await axios.post(`${process.env.REACT_APP_API}/register`, userdata)
            toast.success("User registered Succesfully")

            setUserData({ name: "", password: "", cpassword: "", age: "", address: "" })
        } catch (error) {
            toast.warn("Something goes wrong")
            console.log(error.response.data);
        }


    }
    return (
        <Container maxWidth={'sm'}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5' align="center" > Register Here</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="User Name" variant="filled" name="name" value={userdata.name} onChange={HandleInputs} fullWidth />
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Password" variant="filled" name="password" type="password" value={userdata.password} onChange={HandleInputs} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Confirm Password" variant="filled" type="password" name='cpassword' value={userdata.cpassword} onChange={HandleInputs} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button variant='outlined' onClick={SubmitUserdata}>Register</Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='caption' style={{ cursor: "pointer",color:"blue" }} onClick={handleToggle}>Already Registered? Login here!</Typography>
                </Grid>
            </Grid>
            <ToastContainer position="top-center" theme={"dark"} autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </Container>
    )
}

export default UserReg