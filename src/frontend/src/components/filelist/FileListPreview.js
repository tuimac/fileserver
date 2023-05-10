import React from 'react';
import "react-resizable/css/styles.css";
import { Resizable } from "react-resizable";

import {
  Button,
  IconButton,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@mui/material';

import DownloadIcon from '@mui/icons-material/Download';

import FileServerServices from '../../services/FileServerServices';
import Utils from '../../utils/Utils';

class FileListPreview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      body: '',
      height: 400,
      width: 600
    };
    this.openPreview = this.openPreview.bind(this);
    this.closePreview = this.closePreview.bind(this);
  }

  openPreview = async (filename) => {
    console.log(this.props.path);
    let file_info = await FileServerServices.getFilePreview(Utils.join_path(this.props.path.join('/'), filename));
    await this.setState({ 
      open: true,
      title: filename,
      body: file_info.readable ? file_info.content : 'This file is not readable.'
    });
  }

  closePreview = async () => {
    await this.setState({ open: false });
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
          <Resizable
            height={ this.state.height }
            width={ this.state.width }
            onResize={(event) => {
              this.setState({ 
                ...this.state,
                width: this.state.width + event.movementX,
                height: this.state.height + event.movementY
              });
            }}
          >
            <>
              <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Grid item>
                  <DialogTitle id='preview-title'>{ this.state.title }</DialogTitle>
                </Grid>
                <Grid item>
                  <DialogActions>
                    <IconButton color='primary' onClick={ (e) => FileServerServices.downloadFile(this.props.path.join('/') + this.state.title, this.state.title) }>
                      <DownloadIcon />
                    </IconButton>
                  </DialogActions>
                </Grid>
              </Grid>
              <DialogContent dividers>
                <pre id='preview-body'>{ this.state.body }</pre>
              </DialogContent>
              <DialogActions style={{ justifyContent: "space-between" }}>
                <Button onClick={ (e) => this.closePreview() }>Close</Button>
              </DialogActions>
            </>
          </Resizable>
        </Dialog>
      </>
    );
  };
}

export default FileListPreview;
