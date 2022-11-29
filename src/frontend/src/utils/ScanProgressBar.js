import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import Utils from './Utils.js'

class ScanProgressBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading && this.props.ip !== '') {
      return(
        <Box sx={{ px: 1 }}>
          <Card sx={{ px: 1, py: 1}}>
            <CircularProgress color='primary' />
          </Card>
          <Card sx={{ px: 1, py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={ Math.floor(this.props.index / this.props.max_index * 100) }
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                  { `${ Math.floor(this.props.index / this.props.max_index * 100) }%` }
                </Typography>
              </Box>
            </Box>
          </Card>
          <Card sx={{ px: 1, py: 1 }}>
            <Typography variant="body1">
              Searching IP:  { this.props.ip }
            </Typography>
            <Typography variant="body1">
              Searching Time: { Utils.getTimeStamp(this.props.start_time) }
            </Typography>
            <Typography variant="body1">
              Number of Devices: { this.props.detected_devices }
            </Typography>
          </Card>
        </Box>
      );
    } else if (!this.props.loading && this.props.ip !== '') {
      return(
        <Box sx={{ px: 1 }}>
          <Card sx={{ px: 1, py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={ Math.floor(this.props.index / this.props.max_index * 100) }
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                  { `${ Math.floor(this.props.index / this.props.max_index * 100) }%` }
                </Typography>
              </Box>
            </Box>
          </Card>
          <Card sx={{ px: 1, py: 1 }}>
            <Typography variant="body1">
              Searching IP:  { this.props.ip }
            </Typography>
            <Typography variant="body1">
              Searching Time: { Utils.getTimeStamp(this.props.start_time) }
            </Typography>
            <Typography variant="body1">
              Number of Devices: { this.props.detected_devices }
            </Typography>
          </Card>
        </Box>
      );
    } else {
      return '';
    }
  };
}

export default ScanProgressBar;
