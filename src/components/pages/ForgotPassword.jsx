import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Card, CardContent, useTheme, useMediaQuery, IconButton, InputAdornment } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ForgotPassword = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your password update logic here
        toast.success('Password updated successfully!');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <ToastContainer />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '65vh',
                    // backgroundColor: '#e3f2fd'
                    padding: '1vh 2',  // Adjusted padding to reduce top and bottom
                }}
            >

                <Card sx={{ maxWidth: 800, width: '100%', borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#41B06E', textAlign: 'center', marginBottom: 4 }}>
                            Change Password
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2,
                                        }}
                                    >
                                        <TextField
                                            label="Old Password"
                                            type="password"
                                            fullWidth
                                            required
                                            variant="outlined"
                                        />
                                        <TextField
                                            label="New Password"
                                            type={showPassword ? 'text' : 'password'}
                                            fullWidth
                                            required
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={togglePasswordVisibility}
                                                            edge="end"
                                                            aria-label={showPassword ? 'hide password' : 'show password'}
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <TextField
                                            label="Confirm Password"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            fullWidth
                                            required
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={toggleConfirmPasswordVisibility}
                                                            edge="end"
                                                            aria-label={showConfirmPassword ? 'hide password' : 'show password'}
                                                        >
                                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            sx={{
                                                backgroundColor: '#2979ff',
                                                color: '#fff',
                                                textTransform: 'none',
                                                padding: '10px 20px',
                                                borderRadius: 2,
                                                '&:hover': {
                                                    backgroundColor: '#e3f2fd',
                                                    color: '#000'
                                                },
                                            }}
                                        >
                                            Update
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box
                                        sx={{
                                            // backgroundColor: '#e3f2fd',
                                            borderRadius: 2,
                                            padding: 2,
                                            border: '1px solid #00796b',
                                        }}
                                    >
                                        <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold', color: '#41B06E' }}>
                                            Password must contain the following:
                                        </Typography>
                                        <ul style={{ paddingLeft: 20, marginTop: 0 }}>
                                            <li>A lowercase letter</li>
                                            <li>A capital (uppercase) letter</li>
                                            <li>A special character</li>
                                            <li>A number</li>
                                            <li>Minimum 8 characters and maximum 20 characters</li>
                                        </ul>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default ForgotPassword;