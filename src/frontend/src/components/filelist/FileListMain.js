import React from 'react';
import Box from '@mui/material/Box';
import "react-resizable/css/styles.css";

import FileServerServices from '../../services/FileServerServices';
import Utils from '../../utils/Utils';
import { FILELIST_PATH } from '../../config/environment';
import FileListPreview from './FileListPreview';
import FileListTable from './FileListTable';

class FileListMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: { row: [], column: [] },
      size: {},
      path: [],
      error_path: false,
      open_preview: false
    };
    this.forwardDirectory = this.forwardDirectory.bind(this);
    this.backwardDirectory = this.backwardDirectory.bind(this);
    this.getFileInfo = this.getFileInfo.bind(this);
  }

  async componentDidMount() {
    await this.getFileInfo();
  }

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
      this.getFileInfo();
    }
  }

  getFileInfo = async () => {
    try {
      let file_path = Utils.sanitize_url(window.location.pathname.replace(FILELIST_PATH, '').split('/'));
      await this.setState({ path: file_path });
      await this.setState({ items: await FileServerServices.getFileList(this.state.path.join('/')) });
      var size = await FileServerServices.getItemSize(this.state.path.join('/'));
      this.setState({ size: size });
    } catch(error) {
      await this.setState({ error_path: true });
    }
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
        <FileListPreview path={ this.state.path } ref={ instance => { this.child = instance } } />
        <Box sx={{ flexGrow: 1, pb: 1 }}>
          <FileListTable items={ this.state.items }/>
        </Box>
      </>
    );
  };
}

export default FileListMain;