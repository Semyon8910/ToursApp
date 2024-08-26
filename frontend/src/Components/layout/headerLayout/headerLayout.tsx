import { useDispatch, useSelector } from "react-redux";
import "./headerLayout.css";
import { logout } from "../../redux/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

function HeaderLayout(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authData = JSON.parse(localStorage.getItem('auth') || '{}');
    const isAuthenticated = authData.isAuthenticated;  
    const name = useSelector((state:RootState)=>state.auth.name) || authData.name;
    const surname = useSelector((state:RootState)=>state.auth.surname) || authData.surname;

    const handleLogout = () => {
        dispatch(logout());
        window.location.href = "/";
    };
    
    return (
        <AppBar position="static">
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Tour App
                </Typography>
                {isAuthenticated && <Typography variant="body1">Welcome {name} {surname}</Typography>}
                {isAuthenticated && <Button color="inherit" variant="text" onClick={handleLogout} sx={{
                color: 'inherit',
                '&:hover': {
                    color: 'bisque',
                },
            }}>Logout</Button>}
        </AppBar>
    );
}

export default HeaderLayout;
