import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button} from "@mui/material";


const Forgot = () => {
    let navigate = useNavigate(); 
    const routeResPass = () =>{ 
      let path = `/ResPass`; 
      navigate(path);
    }
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
                marginTop={7}
                padding={3}
                marginBottom={3}
                borderRadius={1}
                boxShadow={"5px 10px 10px 10px #ccc"} 
                    
                sx={{
                    ":hover": {
                        boxShadow:"10px 10px 20px  blue",
                 },
                }}
            >
                <Typography variant="h4" padding={2} textAlign="center">Forgot your password?</Typography>
                <Typography variant="h9" padding={1} textAlign="center">Please enter your email</Typography>
                <TextField margin="normal" type={'email'} variant="outlined" placeholder="Email" />

                <Button sx={{marginTop:2}} type="submit" variant="contained" onClick={routeResPass}> Request password reset </Button>
            
            </Box>
        </form>
    
    </div>
    );
    

};

export default Forgot;


