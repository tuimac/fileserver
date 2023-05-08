import React from 'react';
import { 
  Grid,
  Box,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@mui/material';

import UploadFileIcon from '@mui/icons-material/UploadFile';

import FileUploadList from './FileUploadList';
import FileServerServices from '../../services/FileServerServices';
import Utils from '../../utils/Utils';
import { FILELIST_PATH } from '../../config/environment';

class FileUploadPreview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      height: 400,
      width: 600,
      files: []
    };
    this.openPreview = this.openPreview.bind(this);
    this.closePreview = this.closePreview.bind(this);
    this.selectFiles = this.selectFiles.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  openPreview = async () => {
    await this.setState({ open: true });
  }

  closePreview = async () => {
    await this.setState({ files: [] });
    await this.setState({ open: false });
  }

  selectFiles(upload_file) {
    this.setState({ files: upload_file });
  }

  uploadFile() {
    for(let index in Object.keys(this.state.files)) {
      let data = new FormData();
      data.append('file', this.state.files[index]);
      FileServerServices.uploadFile(this.props.path.join('/'), this.state.files[index].name, data);
    }
    this.props.forwardDirectory(this.props.path.join('/'));
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
            { this.state.files.length === 0
              ?
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <Grid container direction='column' justifyContent='center' alignItems='center'>
                    <Grid item>
                      <IconButton color="primary" aria-label="upload picture" component="label">
                        <UploadFileIcon sx={{ fontSize: 100 }}/>
                        <input hidden multiple accept="*" type="file" onChange={(e) => this.selectFiles(e.target.files) }/>
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" gutterBottom>Drag or Click here</Typography>
                    </Grid>
                  </Grid>
                </Box>
              : <Box>
                  { Object.keys(this.state.files).map((index) => (
                    <FileUploadList key={ this.state.files[index].name } filename={ this.state.files[index].name }/>
                  ))}
                </Box>
            }
            
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
