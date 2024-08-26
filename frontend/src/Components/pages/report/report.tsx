import { useEffect, useState } from "react";
import "./report.css";
import axios from "../../../config/axiosConfig";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import * as XLSX from 'xlsx';
import { Button } from "@mui/material";

function Report(): JSX.Element {
    const [vacationData, setVacationData] = useState<any[]>([]);

    useEffect(() => {
        const getReport = async () => {
            const response = await axios.get("/api/v1/vacations/all");
            const vacations = response.data;

            const followersCountPromises = vacations.map(async (vacation: any) => {
                const followersResponse = await axios.post("/api/v1/followings/followers", { vacationID: vacation.vacationID });
                return { ...vacation, followersCount: followersResponse.data[0].count };
            });

            const vacationStats = await Promise.all(followersCountPromises);
            setVacationData(vacationStats);
        };

        getReport();
    }, []);

    const downloadCSV = () => {
        const csvData = vacationData.map(vacation => ({
            Destination: vacation.destination,
            Followers: vacation.followersCount,
        }));

        const csvContent = "data:text/csv;charset=utf-8," 
            + csvData.map(item => Object.values(item).join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "vacation_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(vacationData.map(vacation => ({
            Destination: vacation.destination,
            Followers: vacation.followersCount,
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Vacation Report");

        XLSX.writeFile(wb, "vacation_report.xlsx");
    };

    return (
        <div className="report">
            <h2>Vacation Report</h2>
            <BarChart width={600} height={300} data={vacationData}>
                <XAxis dataKey="destination" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
                <Bar dataKey="followersCount" fill="#82ca9d" />
            </BarChart>
            <Button variant="contained" color="primary" onClick={downloadCSV}>
                Download CSV
            </Button>
            <Button variant="contained" color="secondary" onClick={downloadExcel}>
                Download Excel
            </Button>
        </div>
    );
}

export default Report;
