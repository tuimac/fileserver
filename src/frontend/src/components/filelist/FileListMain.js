import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import "react-resizable/css/styles.css";

import FileServerServices from '../../services/FileServerServices';
import Utils from '../../utils/Utils';
import { FILELIST_PATH } from '../../config/environment';
import Preview from './Preview';

class FileListMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      directories: [],
      size: {},
      path: [],
      error_path: false,
      open_preview: false
    }
    this.forwardDirectory = this.forwardDirectory.bind(this);
    this.backwardDirectory = this.backwardDirectory.bind(this);
    this.getFileListService = this.getFileListService.bind(this);
    this.getItemSize = this.getItemSize.bind(this);
  }

  componentDidMount = async () => {
    this.getFileListService();
    this.getItemSize();
  }

  componentDidUpdate(prevProps) {
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

  getItemSize() {
    try {
      this.setState({ size: FileServerServices.getItemSize(this.state.path.join('/')) });
    } catch(error) {
      this.setState({ error_path: true });
    } 
  }

  forwardDirectory = async (next_path) => {
    let tmp_path = this.state.path;
    tmp_path.push(next_path);
    await this.setState({ path: tmp_path });
    this.props.navigate(FILELIST_PATH + '/' + this.state.path.join('/'));
    await this.getFileListService();
    await this.getItemSize();
    console.log(this.state.size);
  }

  backwardDirectory = async () => {
    let tmp_path = this.state.path;
    tmp_path.pop();
    await this.setState({ path: tmp_path })
    this.props.navigate(FILELIST_PATH + '/' + this.state.path.join('/'));
    await this.getFileListService();
    await this.getItemSize();
    console.log(this.state.size);
  }

  render() {
    return(
      <>
        <Preview path={ this.state.path } ref={ instance => { this.child = instance } } />
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
                <ListItemText primary={ this.state.size[this.state.directories[index]] } />
              </ListItem>
            ))}
            { Object.keys(this.state.files).map((index) => (
              <ListItem disablePadding key={ this.state.files[index] }>
                <ListItemButton onClick={ (e) => this.child.openPreview(this.state.files[index]) }>
                  <ListItemText primary={ this.state.files[index] }/>
                </ListItemButton>
                <ListItemText primary={ this.state.size[this.state.files[index]] } />
              </ListItem>
            ))}
          </List>
        </Box>
      </>
    );
  };
}

export default FileListMain;
