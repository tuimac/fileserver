import React from 'react';
import "react-resizable/css/styles.css";

import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';

import Utils from '../../utils/Utils';
import { StyledTableCell } from './FileListStyles';
import FileListPreview from './FileListPreview';

class FileListTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      column: {
        'name': 'Name',
        'owner': 'Owner',
        'mtime': 'ModifiedTime',
        'size': 'Size'
      }
    };
  }

  render() {
    return(
      <>
        <FileListPreview path={ this.props.path } ref={ instance => { this.listpreview = instance } } />
        <TableContainer sx={{ maxHeight: window.innerHeight * 0.75 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key='header'>
                { Object.keys(this.state.column).map((index) => (
                  <StyledTableCell align='center' key={ this.state.column[index] }>{ this.state.column[index] }</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover onClick={ (e) => this.props.backwardDirectory() } key='../'>
                { Object.keys(this.state.column).map((index) => (
                  this.state.column[index] === 'Name'
                  ? <StyledTableCell key={ '.. /' }>.. /</StyledTableCell>
                  : <StyledTableCell key={ this.state.column[index] + index.toString() }></StyledTableCell>
                ))}
              </TableRow>
              { Object.keys(this.props.items.row).map((row) => (
                this.props.items.row[row].type === 'directory'
                ? <TableRow hover onClick={ (e) => this.props.forwardDirectory(this.props.items.row[row].name) } key={ this.props.items.row[row].name }>
                    { Object.keys(this.state.column).map((column) => (
                      column === 'name'
                      ? <StyledTableCell key={ this.props.items.row[row].name + column }>{ decodeURIComponent(this.props.items.row[row][column] + '/') }</StyledTableCell>
                      : column === 'mtime'
                        ? <StyledTableCell key={ this.props.items.row[row].name + column }>{ Utils.convert_to_datetime(this.props.items.row[row][column]) }</StyledTableCell>
                        : <StyledTableCell key={ this.props.items.row[row].name + column }>{ this.props.items.row[row][column] }</StyledTableCell>
                    ))}
                  </TableRow>
                : <TableRow hover onClick={ (e) => this.listpreview.openPreview(this.props.items.row[row].name) } key={ this.props.items.row[row].name }>
                    { Object.keys(this.state.column).map((column) => (
                      column === 'mtime'
                      ? <StyledTableCell key={ this.props.items.row[row].name + column }>{ Utils.convert_to_datetime(this.props.items.row[row][column]) }</StyledTableCell>
                      : <StyledTableCell key={ this.props.items.row[row].name + column }>{ decodeURIComponent(this.props.items.row[row][column]) }</StyledTableCell>
                    ))}
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };
}

export default FileListTable;
