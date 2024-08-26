import { Box, Typography } from "@mui/material";
import "./footerLayout.css";

function FooterLayout(): JSX.Element {
    return (
        <Box sx={{ textAlign: 'center', padding: 2, backgroundColor: '#f1f1f1' }}>
            <Typography variant="body2" color="textSecondary">
                (C) Semyon Khramushin
            </Typography>
        </Box>
    );
}

export default FooterLayout;
