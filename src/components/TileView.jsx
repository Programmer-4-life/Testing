import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Fab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/system';

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  padding: theme.spacing(2),
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const CenteredDialogActions = styled(DialogActions)(({ theme }) => ({
  justifyContent: 'center',
}));

const ScrollToTopButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: 'green',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const TileView = ({ data, onEdit, onFlag, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [showScroll, setShowScroll] = useState(false);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setEditedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
    setIsEditing(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleSave = () => {
    onEdit(editedItem);
    setIsEditing(false);
  };

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 300) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 300) {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScroll]);

  return (
    <>
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">{item.email}</Typography>
                <Typography variant="body1">{item.phone}</Typography>
                <div style={{ marginTop: '10px' }}>
                  <Button variant="contained" onClick={() => handleSelect(item)}>
                    View Details
                  </Button>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <Button variant="outlined" onClick={() => handleSelect(item)} style={{ marginRight: '5px' }}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="warning" onClick={() => onFlag(item)} style={{ marginRight: '5px' }}>
                    Flag
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => onDelete(item)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <StyledDialogTitle>
          {selectedItem?.name}
          <IconButton onClick={handleClose} aria-label="close" sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </StyledDialogTitle>
        <StyledDialogContent>
          <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>
            {isEditing ? 'Edit Student' : 'Student Details'}
          </Typography>
          <TextField
            label="Email"
            name="email"
            value={editedItem?.email || ''}
            onChange={handleEditChange}
            fullWidth
            disabled={!isEditing}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Phone"
            name="phone"
            value={editedItem?.phone || ''}
            onChange={handleEditChange}
            fullWidth
            disabled={!isEditing}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="ID"
            name="id"
            value={editedItem?.id || ''}
            onChange={handleEditChange}
            fullWidth
            disabled // ID should not be editable
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Website"
            name="website"
            value={editedItem?.website || ''}
            onChange={handleEditChange}
            fullWidth
            disabled={!isEditing}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Username"
            name="username"
            value={editedItem?.username || ''}
            onChange={handleEditChange}
            fullWidth
            disabled={!isEditing}
            style={{ marginBottom: '16px' }}
          />
        </StyledDialogContent>
        <CenteredDialogActions>
          {isEditing ? (
            <>
              <StyledButton onClick={handleSave}>
                Save
              </StyledButton>
              <StyledButton onClick={() => setIsEditing(false)}>
                Cancel
              </StyledButton>
            </>
          ) : (
            <StyledButton onClick={() => setIsEditing(true)}>
              Edit
            </StyledButton>
          )}
          <StyledButton onClick={handleClose}>
            Close
          </StyledButton>
        </CenteredDialogActions>
      </Dialog>

      {showScroll && (
        <ScrollToTopButton onClick={scrollToTop}>
          <KeyboardArrowUpIcon />
        </ScrollToTopButton>
      )}
    </>
  );
};

export default TileView;
