import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DownloadIcon from '@mui/icons-material/Download';
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

import FileServerServices from '../../services/FileServerServices';
import Utils from '../../utils/Utils';
import { FILELIST_PATH } from '../../config/environment';

class FileListMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      directories: [],
      path: [],
      error_path: false,
      open_preview: false,
      preview: {
        open: false,
        title: '',
        body: '',
        height: 400,
        width: 600
      }
    }
    this.forwardDirectory = this.forwardDirectory.bind(this);
    this.backwardDirectory = this.backwardDirectory.bind(this);
    this.getFileListService = this.getFileListService.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
  }

  componentDidMount = async () => {
    this.getFileListService();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps !== this.props) {
      this.getFileListService();
    }
  }

  getFileListService = async () => {
    try {
      let file_path = Utils.sanitize_url(window.location.pathname.replace(FILELIST_PATH, '').split('/'));
      await this.setState({ path: file_path });
      var result = await FileServerServices.getFileList(this.state.path.join('/'));
      await this.setState({
        files: result.files,
        directories: result.directories
      });
    } catch(error) {
      await this.setState({ error_path: true });
    }
  }

  forwardDirectory = async (next_path) => {
    let tmp_path = this.state.path;
    tmp_path.push(next_path);
    await this.setState({ path: tmp_path })
    this.props.navigate(FILELIST_PATH + '/' + this.state.path.join('/'));
    await this.getFileListService();
  }

  backwardDirectory = async () => {
    let tmp_path = this.state.path;
    tmp_path.pop();
    await this.setState({ path: tmp_path })
    this.props.navigate(FILELIST_PATH + '/' + this.state.path.join('/'));
    await this.getFileListService();
  }

  handlePreview = async (type, filename) => {
    if(type === 'close') {
      let preview = this.state.preview;
      preview.open = false;
      await this.setState({ preview });
    } else {
      let preview = this.state.preview;
      preview.open = true;
      preview.title = filename;
      console.log(filename);
      let file_info = await FileServerServices.getFilePreview(this.state.path + '/' + filename);
      if(file_info.readable === false){
        preview.body = 'This file is not readable.';
      } else {
        preview.body = file_info.content;
      }
      await this.setState({ preview });
    }
  }

  downloadFile = async () => {
    await FileServerServices.downloadFile(this.state.path + '/' + this.state.preview.title, this.state.preview.title);
  }

  render() {
    return(
      <>
        <Dialog
          open={ this.state.preview.open }
          onClose={ (e) => this.handlePreview('close', '') }
          aria-labelledby='preview-title'
          aria-describedby='preview-body'
          fullScreen
          PaperProps={{
            sx: {
              height: this.state.preview.height,
              width: this.state.preview.width
            }
          }}
        >
          <Resizable
            height={ this.state.preview.height }
            width={ this.state.preview.width }
            onResize={(event, data) => {
              this.setState(
                { preview: { 
                  ...this.state.preview,
                  width: this.state.preview.width + event.movementX,
                  height: this.state.preview.height + event.movementY
                }}
              );
            }}
          >
            <>
              <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Grid item>
                  <DialogTitle id='preview-title'>{ this.state.preview.title }</DialogTitle>
                </Grid>
                <Grid item>
                  <DialogActions>
                    <IconButton color='primary' onClick={ (e) => this.downloadFile() }>
                      <DownloadIcon />
                    </IconButton>
                  </DialogActions>
                </Grid>
              </Grid>
              <DialogContent dividers>
                <pre id='preview-body'>{ this.state.preview.body }</pre>
              </DialogContent>
              <DialogActions style={{ justifyContent: "space-between" }}>
                <Button onClick={ (e) => this.handlePreview('close', '') }>Close</Button>
              </DialogActions>
            </>
          </Resizable>
        </Dialog>
        <Box sx={{ flexGrow: 1, pb: 1 }}>
          <List>
            <ListItem disablePadding key='..'>
              <ListItemButton onClick={ (e) => this.backwardDirectory() }>
                <ListItemText primary='.. /' />
              </ListItemButton>
            </ListItem>
            { Object.keys(this.state.directories).map((index) => (
              <ListItem disablePadding key={ this.state.directories[index] }>
                <ListItemButton onClick={ (e) => this.forwardDirectory(this.state.directories[index]) }>
                  <ListItemText primary={ this.state.directories[index] + '/'} />
                </ListItemButton>
              </ListItem>
            ))}
            { Object.keys(this.state.files).map((index) => (
              <ListItem disablePadding key={ this.state.files[index] }>
                <ListItemButton onClick={ (e) => this.handlePreview('open', this.state.files[index]) }>
                  <ListItemText primary={ this.state.files[index] }/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </>
    );
  };
}

export default FileListMain;
