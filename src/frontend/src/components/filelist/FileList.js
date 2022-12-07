import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import FileServerServices from '../../services/FileServerServices';

class FileList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: '',
      directories: ''
    }
  }

  componentDidMount = async () => {
    try {
      var result = await FileServerServices.getFileList('')
      this.setState({
        files: result.files,
        directories: result.directories
      });
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    return(
      <>
        <Box sx={{ flexGrow: 1, pb: 1 }}>
          <List>
            { Object.keys(this.state.directories).map((index) => (
              <ListItem disablePadding key={ this.state.directories[index] }>
                <ListItemButton>
                  <ListItemText primary={ this.state.directories[index] + '/' } />
                </ListItemButton>
              </ListItem>
            ))}
            { Object.keys(this.state.files).map((index) => (
              <ListItem disablePadding key={ this.state.files[index] }>
                <ListItemButton>
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
