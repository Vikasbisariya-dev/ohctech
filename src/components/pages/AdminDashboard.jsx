import  { useState } from 'react';
import { Box, Button, Stack, Typography, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';                                                
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
        },
    },
};

const osiData = {
    labels: ['14-06-2024', '15-06-2024', '16-06-2024', '17-06-2024', '18-06-2024', '19-06-2024', '20-06-2024', '21-06-2024'],
    datasets: [
        {
            label: 'OPD Cases',
            data: [0, 0, 0, 0, 0, 0, 0, 1],
            borderColor: 'blue',
            backgroundColor: 'blue',
        },
        {
            label: 'Injury Cases',
            data: [0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: 'red',
            backgroundColor: 'red',
        },
        {
            label: 'Sickness Cases',
            data: [0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: 'green',
            backgroundColor: 'green',
        },
    ],
};

const injuryData = {
    labels: ['14-06-2024', '15-06-2024', '16-06-2024', '17-06-2024', '18-06-2024', '19-06-2024', '20-06-2024', '21-06-2024'],
    datasets: [
        {
            label: 'MTI - Medical Treatment Injury',
            data: [0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: 'lightgrey',
            backgroundColor: 'lightgrey',
        },
        {
            label: 'First Aid Injury',
            data: [0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: 'red',
            backgroundColor: 'red',
        },
        {
            label: 'LTI - Loss Time Injury',
            data: [0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: 'blue',
            backgroundColor: 'blue',
        },
    ],
};

const AdminDashboard = () => {
    const [showOsiChart, setShowOsiChart] = useState(true);
    const [showInjuryChart, setShowInjuryChart] = useState(true);

    const handleToggleOsiChart = () => {
        setShowOsiChart((prev) => !prev);
    };

    const handleToggleInjuryChart = () => {
        setShowInjuryChart((prev) => !prev);
    };

    return (
        <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2, marginTop: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#00796b', textAlign: 'center' }}>
                ADMIN DASHBOARD
            </Typography>
            <Stack direction="column" spacing={2} alignItems="center">
                <Stack direction="row" spacing={10} justifyContent="center">
                    <Link to = "/PatientProfileList" >
                    <Button variant="contained" sx={{ backgroundColor: '#ffffff', color: '#000', borderRadius: 0, width: 300, height: 64, boxShadow: 3 }}>
                        List of users
                    </Button>
                    </Link>
                    <Link to = "/FoodMasterList" >
                    <Button variant="contained" sx={{ backgroundColor: '#ffffff', color: '#000', borderRadius: 0, width: 300, height: 64, boxShadow: 3 }}>
                        Push food item to master list
                    </Button>
                    </Link>
                    <Link to = "/ExerciseList" >
                    <Button variant="contained" sx={{ backgroundColor: '#ffffff', color: '#000', borderRadius: 0, width: 300, height: 64, boxShadow: 3 }}>
                        Push exercise item to master list
                    </Button>
                    </Link>
                </Stack>
                <Stack direction="row" spacing={60} justifyContent="center">
                    <Button variant="contained" sx={{ backgroundColor: '#ffffff', color: '#000', borderRadius: 0, width: 250, height: 64, boxShadow: 3 }} onClick={handleToggleOsiChart}>
                    Trend of users registered
                    </Button>
                    <Button variant="contained" sx={{ backgroundColor: '#ffffff', color: '#000', borderRadius: 0, width: 250, height: 64, boxShadow: 3 }} onClick={handleToggleInjuryChart}>
                    Trends(avg)
                    </Button>
                </Stack>
                <Grid container spacing={2} sx={{ marginTop: 4 }}>
                    {showOsiChart && (
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                                Trend of users registered
                            </Typography>
                            <Line options={{ ...options, title: { display: true, text: 'OSI Weekly Report' }}} data={osiData} />
                        </Grid>
                    )}
                    {showInjuryChart && (
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                                Trends(avg)
                            </Typography>
                            <Line options={{ ...options, title: { display: true, text: 'Injury Weekly Report' }}} data={injuryData} />
                        </Grid>
                    )}
                </Grid>
            </Stack>
        </Box>
    );
};

export default AdminDashboard;
