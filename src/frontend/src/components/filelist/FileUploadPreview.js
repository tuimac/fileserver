import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

class FileUploadPreview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      height: 400,
      width: 600,
      file: ''
    };
    this.openPreview = this.openPreview.bind(this);
    this.closePreview = this.closePreview.bind(this);
  }

  openPreview = async () => {
    await this.setState({ open: true });
  }

  closePreview = async () => {
    await this.setState({ open: false });
  }

  uploadFile(file) {
    console.log(file);
  }

  render() {
    return(
      <>
        <Dialog
          open={ this.state.open }
          onClose={ (e) => this.closePreview() }
          aria-labelledby='preview-title'
          aria-describedby='preview-body'
          PaperProps={{
            sx: {
              height: this.state.height,
              width: this.state.width
            }
          }}
        >
          <DialogTitle id='preview-title'>Upload</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <Grid container direction='column' justifyContent='center' alignItems='center'>
                <Grid item>
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <UploadFileIcon sx={{ fontSize: 100 }}/>
                    <input hidden accept="*" type="file" />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" gutterBottom>Drag or Click here</Typography>
                </Grid>
              </Grid>  
            </Box>
          </DialogContent>
          <DialogActions style={{ justifyContent: "space-between" }}>
            <Button onClick={ (e) => this.closePreview() }>Close</Button>
            <Button variant='contained' color='success' onClick={ (e) => this.uploadFile() }>Upload</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
}

export default FileUploadPreview;
