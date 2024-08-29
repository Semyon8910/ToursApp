import { useState } from "react";
import axios from "../../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Registration.css";
import { Notyf } from 'notyf';
import { Button, Container, TextField, Typography } from "@mui/material";

function Registration(): JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [userSurname, setUserSurname] = useState("");
    const navigate = useNavigate();
    const notyf = new Notyf();

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post("/authentication/register", {
                email,
                password,
                userName,
                userSurname,
                role: "user"
            });
            if (response.status === 201) {
                notyf.success("Registration successful!");
                navigate("/");
            }
        } catch (err: any) {
            notyf.error(err.response?.data?.msg || "Registration failed");
        }
    };

    return (
        <Container maxWidth="xs">
        <Typography variant="h4" align="center">Register</Typography>
        <form onSubmit={handleRegister}>
            <TextField
                label="Name"
                fullWidth
                margin="normal"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                    inputProps={{ maxLength:44 }}
                    required
                />
                <TextField
                    label="Surname"
                    fullWidth
                    margin="normal"
                    value={userSurname}
                    onChange={(event) => setUserSurname(event.target.value)}
                    inputProps={{ maxLength:44 }}
                    required
                />
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    inputProps={{ maxLength:44 }}
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
                    Register
                </Button>
            </form>
            <Typography align="center" marginTop={2}>
                Already have an account? <a href="/">login here</a>
            </Typography>
        </Container>
    );
}

export default Registration;