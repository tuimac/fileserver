import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

import FileServerServices from '../../services/FileServerServices';
import { FILELIST_PATH } from '../../config/environment';

class FileList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: '',
      directories: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.getFileListService = this.getFileListService.bind(this);
  }

  componentDidMount = async () => {
    this.getFileListService();
  }

  getFileListService = async () => {
    try {
      var result = await FileServerServices.getFileList(
        window.location.pathname.replace(FILELIST_PATH, '')
      )
      this.setState({
        files: result.files,
        directories: result.directories
      });
    } catch(error) {
      console.error(error);
    }
  }

  handleClick = async (path, type) => {
    if(type === 'dir') {
      console.log(FILELIST_PATH + '/' + path);
    }
  }

  render() {
    return(
      <>
        <Box sx={{ flexGrow: 1, pb: 1 }}>
        </Box>
        <Box sx={{ flexGrow: 1, pb: 1 }}>
          <List>
            { Object.keys(this.state.directories).map((index) => (
              <ListItem disablePadding key={ this.state.directories[index] }>
                <ListItemButton onClick={ (e) => this.handleClick(this.state.directories[index], 'dir') }>
                  <ListItemText primary={ this.state.directories[index] + '/'} />
                </ListItemButton>
              </ListItem>
            ))}
            { Object.keys(this.state.files).map((index) => (
              <ListItem disablePadding key={ this.state.files[index] }>
                <ListItemButton onClick={ (e) => this.handleClick(this.state.files[index], 'file') }>
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

export default FileList;
