import { Grid, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

const Choice = () => {
    return (
        <Container maxWidth="md">
            <Grid container spacing={5} justifyContent="center" alignItems={'center'} sx={{ height: "100vh" }}>
                <Grid item xs={6}>
                    <Link to='/form'>
                        <Box sx={{ background: "#f44336", display: "flex", alignItems: "center", justifyContent: "center", height: "13rem", borderRadius: "1rem" }}>
                            <Typography variant='h3' sx={{ color: 'white' }}>Create a Form</Typography>
                        </Box>
                    </Link>
                </Grid>
                <Grid item xs={6}>
                    <Link to='/allforms'>
                        <Box sx={{ background: "#673ab7", display: "flex", alignItems: "center", justifyContent: "center", height: "13rem", borderRadius: "1rem" }}>
                            <Typography variant='h3' sx={{ color: 'white' }}>Submit a Form</Typography>
                        </Box>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Choice