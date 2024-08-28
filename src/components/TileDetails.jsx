import React, { useState } from 'react';
import { Typography, Button, Card, CardContent, Grid, TextField } from '@mui/material';

const TileDetails = ({ item, onBack, onEditSave, isEditing, onEdit }) => {
  const [editedItem, setEditedItem] = useState(item);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleSave = () => {
    onEditSave(editedItem); // Save the edited item
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">{isEditing ? 'Edit Student' : 'Student Details'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {isEditing ? (
              <TextField
                label="ID"
                name="id"
                value={editedItem.id}
                onChange={handleEditChange}
                fullWidth
                disabled
              />
            ) : (
              <Typography variant="body1"><strong>ID:</strong> {item.id}</Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {isEditing ? (
              <TextField
                label="Username"
                name="username"
                value={editedItem.username}
                onChange={handleEditChange}
                fullWidth
              />
            ) : (
              <Typography variant="body1"><strong>Username:</strong> {item.username}</Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {isEditing ? (
              <TextField
                label="Email"
                name="email"
                value={editedItem.email}
                onChange={handleEditChange}
                fullWidth
              />
            ) : (
              <Typography variant="body1"><strong>Email:</strong> {item.email}</Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {isEditing ? (
              <TextField
                label="Phone"
                name="phone"
                value={editedItem.phone}
                onChange={handleEditChange}
                fullWidth
              />
            ) : (
              <Typography variant="body1"><strong>Phone:</strong> {item.phone}</Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {isEditing ? (
              <TextField
                label="Website"
                name="website"
                value={editedItem.website}
                onChange={handleEditChange}
                fullWidth
              />
            ) : (
              <Typography variant="body1"><strong>Website:</strong> {item.website}</Typography>
            )}
          </Grid>
        </Grid>
        {isEditing ? (
          <div style={{ marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: '10px' }}>
              Save
            </Button>
            <Button variant="outlined" onClick={onBack}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button variant="contained" color="primary" onClick={onEdit} style={{ marginTop: '20px' }}>
            Edit
          </Button>
        )}
        <Button variant="contained" onClick={onBack} style={{ marginTop: '20px', marginLeft: '10px' }}>
          Back to Tiles
        </Button>
      </CardContent>
    </Card>
  );
};

export default TileDetails;
