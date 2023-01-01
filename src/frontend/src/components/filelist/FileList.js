import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

import FileServerServices from '../../services/FileServerServices';
import { FILELIST_PATH } from '../../config/environment';
import { preview_style } from '../../utils/Styles';

class FileList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      directories: [],
      path: '',
      error_path: false,
      open_preview: false,
      preview: {
        open: false,
        title: '',
        body: ''
      }
    }
    this.forwardDirectory = this.forwardDirectory.bind(this);
    this.backwardDirectory = this.backwardDirectory.bind(this);
    this.getFileListService = this.getFileListService.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
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
      await this.setState({ error_path: true });
    }
  }

  forwardDirectory = async (path) => {
    await this.setState({ path: this.state.path + '/' + path })
    this.props.navigate(FILELIST_PATH  + this.state.path);
    await this.getFileListService();
  }

  backwardDirectory = async () => {
    let path_list = this.state.path.split('/')
    path_list.pop()
    await this.setState({ path: path_list.join('/') })
    this.props.navigate(FILELIST_PATH  + this.state.path);
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
      let file_info = await FileServerServices.getFilePreview(this.state.path + '/' + filename);
      if(file_info.readable === false){
        preview.body = 'This file is not readable.';
      } else {
        preview.body = file_info.content;
      }
      await this.setState({ preview });
    }
  }

  render() {
    return(
      <>
        <Modal
          open={ this.state.preview.open }
          onClose={ (e) => this.handlePreview('close', '') }
          aria-labelledby='modal-title'
          aria-describedby='modal-body'
        >
          <Box sx={{ ...preview_style }}>
            <h2 id="modal-title">{ this.state.preview.title }</h2>
            <pre id="modal-body">{ this.state.preview.body }</pre>
          </Box>
        </Modal>
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

function PageRedirector(props) {
  let navigate = useNavigate();
  return <FileList {...props} navigate={ navigate } />
}

export default PageRedirector;
