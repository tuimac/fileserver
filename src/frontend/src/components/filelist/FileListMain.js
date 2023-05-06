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
      column: {
        'name': 'Name',
        'owner': 'Owner',
        'mtime': 'ModifiedTime',
        'size': 'Size'
      },
      error: false,
    };
    this.forwardDirectory = this.forwardDirectory.bind(this);
    this.backwardDirectory = this.backwardDirectory.bind(this);
    this.getFileInfo = this.getFileInfo.bind(this);
    this.getFileSize = this.getFileSize.bind(this);
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
      await this.setState({ path: Utils.sanitize_url(window.location.pathname.replace(FILELIST_PATH, '').split('/')) });
      await this.setState({ items: await FileServerServices.getFileList(this.state.path.join('/')) });
      this.setState({ size: await FileServerServices.getItemSize(this.state.path.join('/')) });
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
        <FileListPreview path={ this.state.path } ref={ instance => { this.child = instance } } />
        <Box sx={{ flexGrow: 1, pb: 1 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key='header'>
                { Object.keys(this.state.column).map((index) => (
                  <StyledTableCell align='center' key={ this.state.column[index] }>{ this.state.column[index] }</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover onClick={ (e) => this.backwardDirectory() } key='../'>
                { Object.keys(this.state.column).map((index) => (
                  this.state.column[index] === 'Name'
                  ? <StyledTableCell key={ '.. /' }>.. /</StyledTableCell>
                  : <StyledTableCell key={ this.state.column[index] + index.toString() }></StyledTableCell>
                ))}
              </TableRow>
              { Object.keys(this.state.items.row).map((row) => (
                this.state.items.row[row].type === 'directory'
                ? <TableRow hover onClick={ (e) => this.forwardDirectory(this.state.items.row[row].name) } key={ this.state.items.row[row].name }>
                    { Object.keys(this.state.column).map((column) => (
                      column === 'name'
                      ? <StyledTableCell key={ this.state.items.row[row].name + column }>{ this.state.items.row[row][column] + '/' }</StyledTableCell>
                      : column === 'mtime'
                        ? <StyledTableCell key={ this.state.items.row[row].name + column }>{ Utils.convert_to_datetime(this.state.items.row[row][column]) }</StyledTableCell>
                        : <StyledTableCell key={ this.state.items.row[row].name + column }>{ this.state.items.row[row][column] }</StyledTableCell>
                    ))}
                  </TableRow>
                : <TableRow hover onClick={ (e) => this.child.openPreview(this.state.items.row[row].name) } key={ this.state.items.row[row].name }>
                    { Object.keys(this.state.column).map((column) => (
                      column === 'mtime'
                      ? <StyledTableCell key={ this.state.items.row[row].name + column }>{ Utils.convert_to_datetime(this.state.items.row[row][column]) }</StyledTableCell>
                      : <StyledTableCell key={ this.state.items.row[row].name + column }>{ this.state.items.row[row][column] }</StyledTableCell>
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
