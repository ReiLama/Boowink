import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const Login = () => {
  let navigate = useNavigate();
  const routeSignup = () => {
    let path = `/Signup`;
    navigate(path);
  }
  const routeForget = () => {
    let path = `/Forgot`;
    navigate(path);
  }

  const [emailValue, setEmailValue] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailInput = (event) => {
    setEmailValue(event.target.value);
    console.log(emailValue);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
    console.log(password);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailValue,
        password: password
      })
    });

   const data = await response.json();
    // const token = data.token;
     console.log(data);
    // // localStorage.setItem('token', token);
    // return true;
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
          <Typography variant="h3" padding={3} textAlign="center">Log In</Typography>
          <TextField margin="normal" type={'email'} variant="outlined" placeholder="Email" name="email" onInput={handleEmailInput} />
          <TextField margin="normal" type={'password'} variant="outlined" placeholder="Password" name="password" onInput={handlePasswordInput} />
          <Button sx={{ marginTop: 2 }} type="submit" variant="contained"> Log In </Button>
          <Button sx={{ marginTop: 2 }} type="submit" onClick={routeForget}> Forgot Password </Button>
          <Button sx={{ marginTop: 2 }} type="submit" onClick={routeSignup}> Sign Up </Button>

        </Box>
      </form>

    </div>
  );


};

export default Login;