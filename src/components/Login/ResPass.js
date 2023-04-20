import React from "react";
import { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";


const ResPass = () => {
    const [Newpassword, setNewpassword] = useState("");
    const [confirmNewpassword, setConfirmNewpassword] = useState("");
    const [NewpasswordMatch, setNewpasswordMatch] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Newpassword === confirmNewpassword) {
            console.log("Passwords match");
            setNewpasswordMatch(true);
        } else {
            console.log("Passwords do not match");
            setNewpasswordMatch(false);
        }
    };

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
                    <Typography variant="h3" padding={3} textAlign="center">Reset Password</Typography>
                    <TextField margin="normal" type={'password'} variant="outlined" onChange={(event) => setNewpassword(event.target.value)} placeholder="Password" />
                    <TextField margin="normal" type={'password'} variant="outlined" onChange={(event) => setConfirmNewpassword(event.target.value)}
                        placeholder="Confirm Password" />
                    {!NewpasswordMatch && (
                        <div style={{ color: "red" }}>! Passwords do not match !</div>
                    )}

                    <Button sx={{ marginTop: 2 }} type="submit" variant="contained"> Confirm </Button>

                </Box>
            </form>

        </div>
    );


};

export default ResPass;