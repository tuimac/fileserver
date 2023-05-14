import React from 'react';
import "react-resizable/css/styles.css";

import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Menu,
  MenuItem
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import FileServerServices from '../../services/FileServerServices';
import Utils from '../../utils/Utils';
import { FILELIST_PATH } from '../../config/environment';
import FileUploadPreview from '../fileupload/FileUploadPreview';
import FileListTable from './FileListTable';

class FileListMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: { row: [], column: [], root_path: '' },
      path: [],
      check_list: {},
      actions: {
        open: false,
        anchor: ''
      },
      error: false
    };
    this.getFileInfo = this.getFileInfo.bind(this);
    this.getFileSize = this.getFileSize.bind(this);
    this.forwardDirectory = this.forwardDirectory.bind(this);
    this.backwardDirectory = this.backwardDirectory.bind(this);
  }

  async componentDidMount() {
    await this.getFileInfo();
    let tmp_checked_list = {};
    this.state.items.row.forEach((item) => tmp_checked_list[item.name] = false);
    await this.setState({ checked_list: tmp_checked_list });
  }

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
      this.getFileInfo();
    }
  }

  getFileInfo = async () => {
    try {
      await this.setState({ path: Utils.sanitize_url(window.location.pathname.replace(FILELIST_PATH, '').split('/')) });
      await this.setState({ items: await FileServerServices.getFileList(this.state.path.join('/')) });
      this.getFileSize();
    } catch(error) {
      console.log(error);
      this.setState({ error: true });
    }
  }

  getFileSize = async () => {
    var file_size = await FileServerServices.getItemSize(this.state.path.join('/'));
    var tmp_items = this.state.items.row
    for(var file_name in file_size) {
      // eslint-disable-next-line no-loop-func
      let tmp_item_index = tmp_items.findIndex(({name}) => name === file_name);
      let tmp_item = tmp_items[tmp_item_index];
      tmp_item.size = Utils.size_unit(file_size[file_name]);
      tmp_items[tmp_item_index] = tmp_item;
    }
    this.setState({ items: { row : tmp_items }});
  }

  forwardDirectory = async (next_path) => {
    let tmp_path = this.state.path;
    tmp_path.push(next_path);
    await this.setState({ path: tmp_path });
    this.props.navigate(Utils.join_path(FILELIST_PATH, this.state.path.join('/')));
    await this.getFileInfo();
  }

  backwardDirectory = async () => {
    let tmp_path = this.state.path;
    tmp_path.pop();
    await this.setState({ path: tmp_path })
    this.props.navigate(Utils.join_path(FILELIST_PATH, this.state.path.join('/')));
    await this.getFileInfo();
  }

  render() {
    return(
      <>
        <FileUploadPreview
          path={ this.state.path }
          forwardDirectory={ this.forwardDirectory }
          open={ false }
          ref={ instance => { this.uploadpreview = instance } }
        />
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ flexGrow: 1, pb: 2 }}>
          <Grid item>
            <Box>
            </Box>
          </Grid>
          <Grid item>
            <ButtonGroup>
              <Button variant="contained" color="success" onClick={ (e) => this.setState({ actions: { open: true, anchor: e.currentTarget }})}>Actions</Button>
              <Button size="small" variant="contained" color="success" onClick={ (e) => this.setState({ actions: { open: true, anchor: e.currentTarget }})}>
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <Menu
              open={ this.state.actions.open }
              anchorEl={ this.state.actions.anchor }
              onClose={ (e) => this.setState({ actions: { open: false }}) }
            >
              <MenuItem onClick={ (e) => this.uploadpreview.openPreview() }>Upload Files</MenuItem>
            </Menu>
          </Grid>
        </Grid>
        
        <Box sx={{ flexGrow: 1, pb: 2 }}>
          <FileListTable
            items={ this.state.items }
            path={ this.state.path }
            getFileInfo={ this.getFileInfo }
            forwardDirectory={ this.forwardDirectory }
            backwardDirectory={ this.backwardDirectory }
          />
        </Box>
      </>
    );
  };
}

export default FileListMain;
