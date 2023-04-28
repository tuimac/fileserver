import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
    this.getFileInfo = this.getFileInfo.bind(this);
  }

  componentDidMount = () => {
    this.getFileInfo();
  }

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
      this.getFileInfo();
      console.log('hell');
    }
  }

  getFileInfo = async () => {
    try {
      let file_path = Utils.sanitize_url(window.location.pathname.replace(FILELIST_PATH, '').split('/'));
      await this.setState({ path: file_path });
      var result = await FileServerServices.getFileList(this.state.path.join('/'));
      await this.setState({
        files: result.files,
        directories: result.directories
      });
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
        <Preview path={ this.state.path } ref={ instance => { this.child = instance } } />
        <Box sx={{ flexGrow: 1, pb: 1 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">size</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover onClick={ (e) => this.backwardDirectory() } key='../'>
                <TableCell>.. /</TableCell>
                <TableCell></TableCell>
              </TableRow>
              { Object.keys(this.state.directories).map((index) => (
                <TableRow hover onClick={ (e) => this.forwardDirectory(this.state.directories[index]) } key={ this.state.directories[index] + '/'}>
                  <TableCell>{ this.state.directories[index] + '/'}</TableCell>
                  <TableCell>{ Utils.size_unit(this.state.size[this.state.directories[index]]) }</TableCell>
                </TableRow>
              ))}
              { Object.keys(this.state.files).map((index) => (
                <TableRow hover onClick={ (e) => this.child.openPreview(this.state.files[index]) } key={ this.state.files[index] }>
                  <TableCell>{ this.state.files[index] }</TableCell>
                  <TableCell>{ Utils.size_unit(this.state.size[this.state.files[index]]) }</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </>
    );
  };
}

export default FileListMain;
