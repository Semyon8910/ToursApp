import { useState } from "react";
import axios from "../../../config/axiosConfig";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Notyf } from 'notyf';

function AddVacation(): JSX.Element {
    const [destination, setDestination] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const notyf = new Notyf();
    const navigate = useNavigate();

    const handleAddVacation = async (event: React.FormEvent) => {
        event.preventDefault();
        if (new Date(startDate) > new Date(endDate)) {
            notyf.error("Start date cannot be later than end date.");
            return;
        }
        if (parseFloat(price) > 10000) {
            notyf.error("Price cannot be greater than 10000.");
            return;
        }
        if (parseFloat(price) < 0) {
            notyf.error("Price cannot be less then 0.");
            return;
        }
        if (description.length > 999) {
            notyf.error("Description cannot be greater than 999 characters");
            return;
        }
        if (destination.length > 44) {
            notyf.error("destination cannot be greater than 44 characters");
            return;
        }
        const formData = new FormData();
        formData.append("destination", destination);
        formData.append("description", description);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("price", price);
        if (image) {
            formData.append("image", image);
        }

        await axios.post("/api/v1/vacations/add", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        navigate("/vacations");
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center">Add Vacation</Typography>
            <form onSubmit={handleAddVacation}>
                <TextField
                    label="Destination"
                    fullWidth
                    margin="normal"
                    onChange={(event) => setDestination(event.target.value)}
                    required
                />
                <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    onChange={(event) => setDescription(event.target.value)}
                    required
                />
                <TextField
                    label="Start Date"
                    type="date"
                    fullWidth
                    margin="normal"
                    onChange={(event) => setStartDate(event.target.value)}
                    required
                />
                <TextField
                    label="End Date"
                    type="date"
                    fullWidth
                    margin="normal"
                    onChange={(event) => setEndDate(event.target.value)}
                    required
                />
                <TextField
                    label="Price"
                    type="number"
                    fullWidth
                    margin="normal"
                    onChange={(event) => setPrice(event.target.value)}
                    required
                />
                <input
                    type="file"
                    onChange={(event) => setImage(event.target.files![0])}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Add Vacation
                </Button>
            </form>
        </Container>
    );
}

export default AddVacation;