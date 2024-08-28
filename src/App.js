import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HamburgerMenu from './components/HamburgerMenu';
import HorizontalMenu from './components/HorizontalMenu';
import GridView from './components/GridView';
import TileView from './components/TileView';
import TileDetails from './components/TileDetails';
import GlobalStyles from './styles/GlobalStyles';
import { Snackbar, Alert } from '@mui/material';
import useFetchData from './custom-hooks/FetchData';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
  },
});

const App = () => {
  const [view, setView] = useState('grid');
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { data: fetchedData } = useFetchData('https://jsonplaceholder.typicode.com/users');

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  const handleTileSelect = (item) => {
    setSelectedItem(item);
    setView('details');
    setIsEditing(false);
  };

  const handleBack = () => {
    setView('tile');
    setSelectedItem(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSave = (editedItem) => {
    const updatedData = data.map((user) =>
      user.id === editedItem.id ? editedItem : user
    );
    setData(updatedData);
    setSnackbarMessage(`${editedItem.name} has been updated!`);
    setSnackbarOpen(true);
    setIsEditing(false);
  };


  const handleFlag = (student) => {
    setSnackbarMessage(`${student.name} has been flagged!`);
    setSnackbarOpen(true);
  };

  const handleDelete = (i) => {
    setSnackbarMessage(`${i.name} has been deleted!`);
    setData(data.filter((student) => student.id !== i.id));
    setSnackbarOpen(true);
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <GlobalStyles />
      <IconButton
        style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}
        onClick={handleThemeToggle}
        color="inherit"
      >
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <HamburgerMenu />
      {/* <HorizontalMenu /> */}
      {view === 'grid' && <GridView data={data} onSelect={handleTileSelect} />}
      {view === 'tile' && (
        <TileView
          data={data}
          onSelect={handleTileSelect}
          onEdit={handleEdit}
          onFlag={handleFlag}
          onDelete={handleDelete}
        />
      )}
      {view === 'details' && selectedItem && (
        <TileDetails item={selectedItem} onBack={handleBack} onEditSave={handleEditSave} isEditing={isEditing}
          onEdit={handleEdit} />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default App;
