import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";


const Signup = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            console.log("Passwords match");
            setPasswordMatch(true);
        } else {
            console.log("Passwords do not match");
            setPasswordMatch(false);
        }
    };
    let navigate = useNavigate();
    const routeLogin = () => {
        let path = `/Login`;
        navigate(path);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    display="flex"
                    flexDirection={"column"}
                    maxWidth={450}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={4}
                    padding={3}
                    marginBottom={4}
                    borderRadius={1}
                    boxShadow={"5px 10px 10px 10px #ccc"}

                    sx={{
                        ":hover": {
                            boxShadow: "10px 10px 20px  blue",
                        },
                    }}
                >
                    <Typography variant="h3" padding={3} textAlign="center">Sign Up</Typography>
                    <TextField margin="normal" type={'text'} variant="outlined" placeholder="Name" />
                    <TextField margin="normal" type={'email'} variant="outlined" placeholder="Email" />
                    <TextField margin="normal" type={'password'} variant="outlined" onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
                    <TextField margin="normal" type={'password'} variant="outlined" onChange={(event) => setConfirmPassword(event.target.value)}
                        placeholder="Confirm Password" />
                    {!passwordMatch && (
                        <div style={{ color: "red" }}>! Passwords do not match !</div>
                    )}

                    <Button sx={{ marginTop: 2 }} type="submit" variant="contained"> Sign UP </Button>
                    <Button sx={{ marginTop: 2 }} type="submit" onClick={routeLogin}> Already have an account </Button>

                </Box>
            </form>

        </div>
    );


};

export default Signup;