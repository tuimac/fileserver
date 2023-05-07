import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
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

  readyFile(file) {
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
          fullScreen
          PaperProps={{
            sx: {
              height: this.state.height,
              width: this.state.width
            }
          }}
        >
          <DialogTitle id='preview-title'>Upload</DialogTitle>
          <DialogContent dividers>
          <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="*" type="file" />
                <UploadFileIcon />
              </IconButton>
            </Grid>
          </Grid>
          </DialogContent>
          <DialogActions style={{ justifyContent: "space-between" }}>
            <Button onClick={ (e) => this.closePreview() }>Close</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
}

export default FileUploadPreview;
