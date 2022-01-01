import { Item } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const About = () => {
    return (
        <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)' }}>
            <Item>1</Item>
            <Item>1</Item>
            <Item>1</Item>
        </Box>

    );
};

export default About;