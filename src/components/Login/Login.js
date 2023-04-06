import React from "react";
// import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button } from "@mui/material";


const Login = () => {
//     let navigate = useNavigate(); 
//   const routeSignup = () =>{ 
//     let path = `/Signup`; 
//     navigate(path);
//   }
//   const routeForget = () =>{ 
//     let path = `/Forgot`; 
//     navigate(path);
//   }

   
    return (
        <div>
            <form>
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
                    <Typography variant="h3" padding={3} textAlign="center">Log In</Typography>
                    <TextField margin="normal" type={'email'} variant="outlined" placeholder="Email" />
                    <TextField margin="normal" type={'password'} variant="outlined" placeholder="Password" />

                    <Button sx={{ marginTop: 2 }} type="submit" variant="contained"> Log In </Button>
                    <Button sx={{ marginTop: 2 }} type="submit" > Forgot Password </Button>
                    <Button sx={{ marginTop: 2 }} type="submit" > Sign Up </Button>

                </Box>
            </form>

        </div>
    );


};

export default Login;