import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../config/axiosConfig";
import { Vacation } from "../../Models/vacations";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Notyf } from 'notyf';

function EditVacation(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const [vacation, setVacation] = useState<Vacation | any>(null);
    const [destination, setDestination] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<File | any>(null);
    const notyf = new Notyf();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVacation = async () => {
            const response = await axios.get(`/api/v1/vacations/${id}`);
            setVacation(response.data);
            setDestination(response.data.destination);
            setDescription(response.data.description);
            setStartDate(response.data.startDate.split("T")[0]);
            setEndDate(response.data.endDate.split("T")[0]);
            setPrice(response.data.price);
            setImage(response.data.photo);
            console.log(response.data);
        };
        fetchVacation();
    }, [id]);

    const handleEditVacation = async (event: React.FormEvent) => {
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
        formData.append("vacationID", id!);
        formData.append("destination", destination);
        formData.append("description", description);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("price", price);
        if (image) {
            formData.append("image", image);
        }

        await axios.post(`/api/v1/vacations/edit`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(formData);
        navigate("/vacations");
    };

    if (!vacation) return <div>Loading...</div>;

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center">Edit Vacation</Typography>
            <form onSubmit={handleEditVacation}>
                <TextField
                    label="Destination"
                    value={destination}
                    fullWidth
                    margin="normal"
                    onChange={(event) => setDestination(event.target.value)}
                    required
                />
                <TextField
                    label="Description"
                    value={description}
                    fullWidth
                    margin="normal"
                    onChange={(event) => setDescription(event.target.value)}
                    required
                />
                <TextField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    fullWidth
                    margin="normal"
                    onChange={(event) => setStartDate(event.target.value)}
                    required
                />
                <TextField
                    label="End Date"
                    type="date"
                    value={endDate}
                    fullWidth
                    margin="normal"
                    onChange={(event) => setEndDate(event.target.value)}
                    required
                />
                <TextField
                    label="Price"
                    type="number"
                    value={price}
                    fullWidth
                    margin="normal"
                    onChange={(event) => setPrice(event.target.value)}
                    required
                />
                {image && (
                    <div>
                        <img src={`http://localhost:8080/${image}`} alt="Current" style={{ width: '100%', marginBottom: '10px' }} />
                    </div>
                )}
                <input
                    type="file"
                    onChange={(event) => setImage(event.target.files![0])}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Update Vacation
                </Button>
            </form>
        </Container>
    );
}

export default EditVacation;