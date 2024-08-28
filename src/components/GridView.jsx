import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const GridView = ({ data, onSelect }) => (
  <Grid container spacing={2}>
    {data.map((item) => (
      <Grid item xs={12} sm={6} md={4} lg={2.4} key={item.id}>
        <Card>
          <CardContent>
            <Typography variant="h6">{item.name}</Typography>
            <Button variant="contained" onClick={() => onSelect(item)}>
              View Details
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default GridView;
