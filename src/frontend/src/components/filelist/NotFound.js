import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

class NotFound extends React.Component {

  constructor() {}

  render() {
    return(
      <>
        <Box sx={{ flexGrow: 1, pb: 1 }}>
          <Typography variant="h1" gutterBottom>
            Not found { window.location }.
          </Typography>
        </Box>
      </>
    );
  };
}

export default NotFound;
