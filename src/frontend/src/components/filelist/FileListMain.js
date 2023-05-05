import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import "react-resizable/css/styles.css";

import FileServerServices from '../../services/FileServerServices';
import Utils from '../../utils/Utils';
import { FILELIST_PATH } from '../../config/environment';
import FileListPreview from './FileListPreview';
import { StyledTableCell } from './FileListStyles';

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
    if(prevProps !== this.state) {
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
    this.state.navigate(Utils.join_path(FILELIST_PATH, this.state.path.join('/')));
    await this.getFileInfo();
  }

  backwardDirectory = async () => {
    let tmp_path = this.state.path;
    tmp_path.pop();
    await this.setState({ path: tmp_path })
    this.state.navigate(Utils.join_path(FILELIST_PATH, this.state.path.join('/')));
    await this.getFileInfo();
  }

  render() {
    return(
      <>
        <FileListPreview path={ this.state.path } />
        <Box sx={{ flexGrow: 1, pb: 1 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key='header'>
                { Object.keys(this.state.items.column).map((index) => (
                  this.state.items.column[index] === 'type' ? '' : <StyledTableCell align='center' key={ this.state.items.column[index] }>{ this.state.items.column[index] }</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover onClick={ (e) => this.backward() } key='../'>
                <StyledTableCell>.. /</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
              { Object.keys(this.state.items.row).map((index) => (
                this.state.items.row[index].type === 'directory'
                ? <TableRow hover onClick={ (e) => this.state.forward(this.state.items.row[index].name) } key={ index }>
                    { Object.values(this.state.items.row[index]).map((value) => (
                      <StyledTableCell key={ value }>{ value }</StyledTableCell>
                    ))}
                  </TableRow>
                : <TableRow hover key={ index }>
                    { Object.values(this.state.items.row[index]).map((value) => (
                      <StyledTableCell key={ value }>{ value }</StyledTableCell>
                    ))}
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
