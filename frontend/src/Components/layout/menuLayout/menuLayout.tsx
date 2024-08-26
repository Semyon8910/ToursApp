import { NavLink } from "react-router-dom";
import "./menuLayout.css";
import { Box, Divider, Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function MenuLayout(): JSX.Element {
    const authData = JSON.parse(localStorage.getItem('auth') || '{}');
    const userRole = useSelector((state: RootState) => state.auth.role) || authData.role;

    if (userRole !== 'admin') {
        return <></>; 
    }

    return (
            <Box sx={{ width: 250 }}>
                <Typography variant="h6" align="center" sx={{ padding: 2 }}>
                    Admin Menu
                </Typography>
                <Divider />
                <List>
                    <ListItem button component={NavLink} to="/vacations">
                        <ListItemText primary="Vacations" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/addVacation">
                        <ListItemText primary="Add Vacation" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/report">
                        <ListItemText primary="Reports" />
                    </ListItem> 
                </List>
            </Box>
    );
}

export default MenuLayout;
