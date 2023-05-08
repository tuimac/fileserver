import React from 'react';
import {
  List,
  ListItem,
  ListItemText
} from '@mui/material';

class FileUploadList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <>
        <List>
          <ListItem>
            <ListItemText>{ this.props.filename }</ListItemText>
          </ListItem>
        </List>
      </>
    );
  };
}

export default FileUploadList;
