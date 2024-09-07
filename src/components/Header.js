import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack,Paper,InputBase,Divider,IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Header.css";
import DirectionsIcon from '@mui/icons-material/Directions';
import SearchIcon from '@mui/icons-material/Search';

const Header = ({ children, hasHiddenAuthButtons,setSearchValue }) => {

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  }

    const history = useHistory();
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon" onClick={()=>{
              history.push('/');
            }}></img>
        </Box>

        {!children && window.innerWidth > 768 &&
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for items/categories"
          inputProps={{ 'aria-label': 'search google maps' }}  
          onChange={handleSearch}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
          </Paper>
        }

        {
          localStorage.getItem("username")
           ?
        <div className="profile-img">
        <img className="profImg" src="/avatar.png" alt={localStorage.getItem("username")}></img>
        <p style={{paddingLeft:"4px"}}>{localStorage.getItem("username")}</p>
        <Button
          className="login-button"
          variant="text"
          onClick={()=>{
            localStorage.clear();
            window.location.reload();
            history.push("/");
          }}
        >
          LOGOUT
        </Button>
        </div> :
          (
            hasHiddenAuthButtons ?
            <Button
            className="explore-button"
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={()=>{
              history.push("/")
            }}
          >
            Back to explore
            </Button>:
            <div>
              <Button
                className="login-button"
                variant="text"
                onClick={()=>{
                  history.push("/login")
                }}
              >
                LOGIN
              </Button>
              <Button
                className="register-button"
                variant="text"
                onClick={()=>{
                  history.push("/register")
                }}
              >
                REGISTER
              </Button>
            </div>   

          ) 
        }
      </Box>
    );
};

export default Header;
