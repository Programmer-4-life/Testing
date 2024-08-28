import React, { useState } from 'react';
import { Drawer, AppBar, Toolbar, IconButton, Typography, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';

const StyledListItem = styled(ListItem)({
  color: 'white',
  backgroundColor: '#333',
  transition: 'background 0.3s ease, color 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#1f1f1f',
    color: '#ffab00',
  },
});

const SubMenu = styled('ul')({
  display: 'none',
  marginLeft: '20px',
  padding: 0,
  listStyle: 'none',
  '& li': {
    padding: '0 0 8px 0',
  },
  '& a': {
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      color: '#ffab00',
    },
  },
});

const StyledListItemWithSubMenu = styled(StyledListItem)({
  position: 'relative',
  alignItems: 'flex-start',
  cursor: 'default',
  '&:hover': {
    '& > ul': {
      display: 'block',
    },
  },
});

const HamburgerMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" elevation={0} style={{ background: '#333' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Testing
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { backgroundColor: '#333' } }}
      >
        <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            <StyledListItem button onClick={toggleDrawer(false)}>
              Home
            </StyledListItem>
            <StyledListItem button onClick={toggleDrawer(false)}>
              About
            </StyledListItem>
            <StyledListItemWithSubMenu button>
              Services
              <SubMenu>
                <li><a href="#" onClick={toggleDrawer(false)}>Web Development</a></li>
                <li><a href="#" onClick={toggleDrawer(false)}>Machine Learning</a></li>
                <li><a href="#" onClick={toggleDrawer(false)}>SEO</a></li>
              </SubMenu>
            </StyledListItemWithSubMenu>
            <StyledListItem button onClick={toggleDrawer(false)}>
              Contact
            </StyledListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
