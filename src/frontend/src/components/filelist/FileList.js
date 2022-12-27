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
      files: [],
      directories: [],
      path: ''
    }
    this.forwardDirectory = this.forwardDirectory.bind(this);
    this.getFileListService = this.getFileListService.bind(this);
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
      await this.setState({
        path: window.location.pathname.replace(FILELIST_PATH, '')
      });
      var result = await FileServerServices.getFileList(this.state.path);
      await this.setState({
        files: result.files,
        directories: result.directories
      });
    } catch(error) {
      console.error(error);
    }
  }

  forwardDirectory = async (path, type) => {
    if(type === 'dir') {
      console.log(this.props);
      await this.setState({ path: this.state.path + '/' + path })
      this.props.navigate(FILELIST_PATH  + this.state.path);
      await this.getFileListService();
    }
  }

  backwardDirectory = async () => {
    let path_list = this.state.path.split('/')
    path_list.pop()
    await this.setState({ path: path_list.join('/') })
    this.props.navigate(FILELIST_PATH  + this.state.path);
    await this.getFileListService();
  }

  render() {
    return(
      <>
        <Box sx={{ flexGrow: 1, pb: 1 }}>
          <List>
            <ListItem disablePadding key='..'>
              <ListItemButton onClick={ (e) => this.backwardDirectory() }>
                <ListItemText primary='.. /' />
              </ListItemButton>
            </ListItem>
            { Object.keys(this.state.directories).map((index) => (
              <ListItem disablePadding key={ this.state.directories[index] }>
                <ListItemButton onClick={ (e) => this.forwardDirectory(this.state.directories[index], 'dir') }>
                  <ListItemText primary={ this.state.directories[index] + '/'} />
                </ListItemButton>
              </ListItem>
            ))}
            { Object.keys(this.state.files).map((index) => (
              <ListItem disablePadding key={ this.state.files[index] }>
                <ListItemButton onClick={ (e) => this.forwardDirectory(this.state.files[index], 'file') }>
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

function PageRedirector(props) {
  let navigate = useNavigate();
  return <FileList {...props} navigate={ navigate } />
}

export default PageRedirector;
