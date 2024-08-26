import { useEffect, useState } from "react";
import { Vacation } from "../../Models/vacations";
import "./singleVacation.css";
import axios from "../../../config/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";

interface vacationProps{
    vacation:Vacation;
    userID: number | null; 
    onDelete: (vacationID: number) => void;
}

function SingleVacation(props:vacationProps): JSX.Element {
    const [followersCount, setFollowersCount] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);
    const authData = JSON.parse(localStorage.getItem('auth') || '{}');
    const userRole = useSelector((state: RootState) => state.auth.role) || authData.role;
    const navigate = useNavigate();


    useEffect(() => {
        const getFollowersCount = async () => {
            const response = await axios.post(`/api/v1/followings/followers`, { vacationID: props.vacation.vacationID });
            setFollowersCount(response.data[0].count);
        };
        
        const checkIfFollowing = async () => {
            if (props.userID) {
                const response = await axios.post(`/api/v1/followings/check`, { vacationID: props.vacation.vacationID, userID: props.userID });
                setIsFollowing(response.data.isFollowing);
            }
        };

        getFollowersCount();
        checkIfFollowing();
    }, [props.vacation.vacationID, props.userID]);

    const handleFollowToggle = async () => {
        if (isFollowing) {
            await axios.post("/api/v1/followings/unFollow", { userID: props.userID, vacationID: props.vacation.vacationID });
            setIsFollowing(false);
        } else {
            await axios.post("/api/v1/followings/follow", { userID: props.userID, vacationID: props.vacation.vacationID });
            setIsFollowing(true);
        }
        setFollowersCount(prevCount => isFollowing ? prevCount - 1 : prevCount + 1);
    };

    const handleEdit = () => {
        navigate(`/editVacation/${props.vacation.vacationID}`);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this vacation?")) {
            axios.post("/api/v1/vacations/delete", { vacationID: props.vacation.vacationID });
            props.onDelete(props.vacation.vacationID);
        }
    };
    

    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            {props.vacation.photo && (
                <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:8080/${props.vacation.photo}`}
                    alt={props.vacation.destination}
                />
            )}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.vacation.destination}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.vacation.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Start Date: {props.vacation.startDate.split("T")[0]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    End Date: {props.vacation.endDate.split("T")[0]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: {props.vacation.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Followers: {followersCount}
                </Typography>
            </CardContent>
            {userRole === 'admin' ? (
                <CardContent>
                    <Button onClick={handleEdit} color="primary">Edit</Button>
                    <Button onClick={handleDelete} color="secondary">Delete</Button>
                </CardContent>
            ) : (
                <CardContent>
                    <Button onClick={handleFollowToggle} color="primary">
                        {isFollowing ? "Unfollow" : "Follow"}
                    </Button>
                </CardContent>
            )}
        </Card>
    );
}

export default SingleVacation;
