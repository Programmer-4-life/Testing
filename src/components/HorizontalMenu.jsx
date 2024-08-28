import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const MenuWrapper = styled(AppBar)`
  background: #333;
  padding: 10px;
`;

const MenuButton = styled(Button)`
  color: white;
  margin-right: 20px;
  text-transform: none; /* Prevents uppercase transformation */
  font-weight: bold;
  &:hover {
    background-color: #444; /* Darker background on hover */
    color: #ffab00; /* Gold color on hover */
  }
`;

const HorizontalMenu = () => (
  <MenuWrapper position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Testing
      </Typography>
      <MenuButton>Dashboard</MenuButton>
      <MenuButton>Students</MenuButton>
      <MenuButton>Reports</MenuButton>
    </Toolbar>
  </MenuWrapper>
);

export default HorizontalMenu;
