import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  const handleUserNameChange = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
  } 

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  } 

  const handleConfirmPasswordChange = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  }

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async () => {
      if(!validateInput({
        "username":userName,
        "password":password,
        "confirmPassword":confirmPassword
      })){
        return;
      }

      setIsLoading(true);
      try{
        let options = {
          "username":userName,
          "password":password
        }
  
          let data = await axios.post(`${config.endpoint}/auth/register`,options);
          if(data.status == 201){
            enqueueSnackbar("Registered successfully");
          }
          setIsLoading(false);
          history.push("/login");
      }catch(error){
        setIsLoading(false);
        if(error.response.status == 400){
          enqueueSnackbar(error.response.data.message)
        }else{
          enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.")
        }
      }
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
      if(!data.username || data.username.length < 6){
        enqueueSnackbar(data.username ? "Username must be at least 6 characters" : "Username is a required field");
        return false;
      }
      if(!data.password || data.password.length < 6){
        enqueueSnackbar(data.password ? "Password must be at least 6 characters" : "Password is a required field");
        return false;
      }
      if(data.password !== data.confirmPassword){
        enqueueSnackbar("Password do not match");
        return false;
      }
      return true;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={userName}
            onChange={handleUserNameChange}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={password}
            onChange={handlePasswordChange}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
           <Button className="button" variant="contained" onClick={register}>
            Register Now
           </Button>
           {isLoading && <CircularProgress color="success" />}
          <p className="secondary-action">
            Already have an account?{" "}
             <Link className="link" to="/login">Login here</Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
