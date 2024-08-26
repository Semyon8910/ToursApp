import { useEffect, useState } from "react";
import { Vacation } from "../../Models/vacations";
import "./vacationsList.css";
import axios from "../../../config/axiosConfig";
import SingleVacation from "../singleVacation/singleVacation";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Box, FormControlLabel, Pagination, Switch } from "@mui/material";

function VacationsList(): JSX.Element {
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const authData = JSON.parse(localStorage.getItem('auth') || '{}');
    const userRole = useSelector((state: RootState) => state.auth.role) || authData.role;
    const userID = useSelector((state: RootState) => state.auth.userID) || authData.userID;
    const [showFollowed, setShowFollowed] = useState(false);
    const [showUpcoming, setShowUpcoming] = useState(false);
    const [showOngoing, setShowOngoing] = useState(false);
    const [followedVacation, setFollowedVacation] = useState<number[]>([]);

    

    useEffect(()=>{
        const getVacations = async () => {
            const response = await axios.get("/api/v1/vacations/all");
            const sortedVacations = response.data.sort((first: Vacation, second: Vacation) => {
                return new Date(first.startDate).getTime() - new Date(second.startDate).getTime();
            });
            setVacations(sortedVacations);
        };

        getVacations();
    },[userID]);

    const getFollowedVacations = async () => {
        if (userID) {
            const response = await axios.post("/api/v1/followings/followedVacations", { userID });
            setFollowedVacation(response.data);
        }
    };

    const handleDeleteVacation = (vacationID: number) => {
        setVacations(prevVacations => prevVacations.filter(vacation => vacation.vacationID !== vacationID));
    };

    const indexOfLastVacation = currentPage * itemsPerPage;
    const indexOfFirstVacation = indexOfLastVacation - itemsPerPage;

    const filteredVacations = vacations.filter(vacation => {
        const now = new Date();
        const startDate = new Date(vacation.startDate);
        const endDate = new Date(vacation.endDate);
        
        const isFollowed = followedVacation.includes(vacation.vacationID);
        const isUpcoming = startDate > now;
        const isOngoing = startDate <= now && endDate >= now;

        return (showFollowed ? isFollowed : true) &&
               (showUpcoming ? isUpcoming : true) &&
               (showOngoing ? isOngoing : true);
    });

    const currentVacations = filteredVacations.slice(indexOfFirstVacation, indexOfLastVacation);

    return (
        <div className="container">
            {userRole === 'user' && (
                <Box display="flex" justifyContent="center" marginBottom={2}>
                    <FormControlLabel
                        control={<Switch checked={showFollowed} onChange={() => {   getFollowedVacations();
                                                                                    setShowFollowed(!showFollowed);
                                                                                }} />}
                        label="Show Followed"
                    />
                    <FormControlLabel
                        control={<Switch checked={showUpcoming} onChange={() => setShowUpcoming(!showUpcoming)} />}
                        label="Show Upcoming"
                    />
                    <FormControlLabel
                        control={<Switch checked={showOngoing} onChange={() => setShowOngoing(!showOngoing)} />}
                        label="Show Ongoing"
                    />
                </Box>
            )}
            <Box display="flex" flexWrap="wrap" justifyContent="center">
                {currentVacations.map(item => (
                    <SingleVacation key={item.vacationID} vacation={item} userID={userID} onDelete={handleDeleteVacation} />
                ))}
            </Box>
            <Box display="flex" justifyContent="center" marginTop={2}>
                <Pagination
                    count={Math.ceil(filteredVacations.length / itemsPerPage)}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    color="primary"
                />
            </Box>
        </div>
    );
}

export default VacationsList;
