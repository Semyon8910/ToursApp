import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice"
import axios from "../../../config/axiosConfig";
import "./Authentication.css";
import { Notyf } from 'notyf';
import { Button, Container, TextField, Typography } from "@mui/material";

function Authentication(): JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notyf = new Notyf();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post("/authentication/login", { email, password });
            dispatch(login({role: response.data.role, userID: response.data.userID, name: response.data.name, surname: response.data.surname, jwt: response.data.jwt}));
            navigate("/vacations");
        } catch (err: any) {
            notyf.error(err.response?.data?.msg || "email or password incorrect");
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center">Login</Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    inputProps={{ minLength: 4, maxLength: 20 }}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
            <Typography align="center" marginTop={2}>
                Don't have an account? <a href="/register">Register here</a>
            </Typography>
        </Container>
    );
}

export default Authentication;