import React from 'react';
import {
  Grid,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

import FileServerServices from '../../services/FileServerServices';

class FileDeletePreview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      height: 400,
      width: 600
    };
    this.openPreview = this.openPreview.bind(this);
    this.closePreview = this.closePreview.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }

  openPreview = async () => {
    await this.setState({ open: true });
  }

  closePreview = async () => {
    await this.setState({ open: false });
    this.props.closeActions();
  }

  deleteFile = async (event) => {
    event.preventDefault();
    await FileServerServices.deleteFile(this.props.path.join('/'), this.props.check_list);
    await this.props.forwardDirectory('');
    this.closePreview();
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
          <DialogTitle id='preview-title'>Delete Files</DialogTitle>
          <DialogContent dividers>
            <Grid container direction='row' justifyContent='space-between' alignItems='left'>
              <Grid item>
                <Box>
                  <List key='delete_list'>
                    { Object.keys(this.props.check_list).map((index) => (
                      <ListItem key={ this.props.check_list[index] }>
                        <ListItemText>{ this.props.check_list[index] }</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ justifyContent: "space-between" }}>
            <Button onClick={ (e) => this.closePreview() }>Close</Button>
            <Button variant='contained' color='success' onClick={ (e) => this.deleteFile(e) }>Delete</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
}

export default FileDeletePreview;
