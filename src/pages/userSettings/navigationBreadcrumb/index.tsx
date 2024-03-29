import { ROUTES } from '@/constants/endpoint';
import { Home } from '@mui/icons-material';
import { Box, Breadcrumbs, Chip, Link } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ChipStyle = {
    bgcolor: '#E6EDF8',
    cursor: 'pointer',
    '&:hover': {
        bgcolor: '#D4E1F4',
        transition: 'background-color 0.3s ease',
    },
}

const BreadCrumb = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location)
    const previousEndpoint = location.state || '/';
    console.log({previousEndpoint})
    const handleNavigateHome = () => {
        navigate(ROUTES.APP_ROOT, { replace: true });
      };
      const handleNavigateDashboard = () => {
        navigate(ROUTES.DASHBOARD, { replace: true });
      };
      const handleNavigateCanvas = () => {
        navigate(ROUTES.CANVAS);
      };

    return (
        <Box sx={{ m: '2% 0 0 8%' }}>
            <Breadcrumbs>
                <Chip label="Home" icon={<Home sx={{ fontSize: '1.2rem' }} />} sx={ChipStyle} onClick={handleNavigateHome}/>
                {previousEndpoint === ROUTES.CANVAS && <Breadcrumbs>
                    <Chip label="Dashboard" sx={ChipStyle} onClick={handleNavigateDashboard}/>
                    <Chip label="Back to Presentation" sx={ChipStyle} onClick={handleNavigateCanvas} />
                </Breadcrumbs>}
                <Chip label="Settings" sx={ChipStyle} />
            </Breadcrumbs>
        </Box>
    );
}

export default BreadCrumb