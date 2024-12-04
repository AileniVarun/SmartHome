import React, { useState } from "react";
import { Devices, Dashboard, AccountCircle, Info } from '@mui/icons-material'; 
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import "../Styles/NavBar.css";



import { Menu, MenuItem } from "@mui/material";

function NavBar() {
    const navigate = useNavigate();
    const { user } = useUser();

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleDashboard = () => navigate("/dashboard");
    const handleDevices = () => navigate("/devices");
    const handleAboutUs = () => navigate("/aboutus"); 
    const handleSettings = () => navigate("/settings");
    const handleLogout = () => navigate("/login");

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary text-white px-4 py-2 shadow-sm">
            <button
                className="g168-button"
                onClick={handleDashboard}
            >
            G168.
            </button>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto" style={{ cursor: "pointer" }}>
                    <li className="nav-item me-3">
                        <span className="nav-link fs-6" onClick={handleDashboard}>
                            <Dashboard fontSize="small" /> Dashboard
                        </span>
                    </li>
                    <li className="nav-item me-3">
                        <span className="nav-link fs-6" onClick={handleDevices}>
                            <Devices fontSize="small" /> Devices
                        </span>
                    </li>
                    <li className="nav-item me-3">
                        <span className="nav-link fs-6" onClick={handleAboutUs}>
                            <Info fontSize="small" /> About Us
                        </span>
                    </li>
                    <li className="nav-item">
                        <span
                            className="nav-link fs-6 d-flex align-items-center"
                            onClick={handleMenuClick}
                        >
                            <AccountCircle fontSize="medium" />
                        </span>
                        <Menu
                            className="menu-container" 
                            anchorEl={anchorEl}
                            open={openMenu}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            PaperProps={{
                                style: {
                                    borderRadius: '16px', // Curved edges for the dropdown menu
                                    overflow: 'hidden', // Prevent items from overflowing the menu container
                                },
                            }}
                        >
                            <MenuItem
                                className="menu-item" // Class for customizing each menu item
                                onClick={() => {
                                    handleSettings();
                                    handleMenuClose();
                                }}
                            >
                                Settings
                            </MenuItem>
                            <MenuItem
                                className="menu-item" // Class for customizing each menu item
                                onClick={() => {
                                    handleLogout();
                                    handleMenuClose();
                                }}
                            >
                                Logout
                            </MenuItem>
                        </Menu>



                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
