import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import "react-resizable/css/styles.css";

import { StyledTableCell } from './FileListStyles';

class FileListTable extends React.Component {

  constructor(props) {
    super(props);
    this.stete = {};
  }

  render() {
    return(
      <>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow key='header'>
              { Object.keys(this.props.items.column).map((index) => (
                this.props.items.column[index] === 'type' ? '' : <StyledTableCell align='center' key={ this.props.items.column[index] }>{ this.props.items.column[index] }</StyledTableCell>
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
              { Object.keys(this.props.items.row).map((index) => (
                this.props.items.row[index].type === 'directory'
                ? <TableRow hover onClick={ (e) => this.props.forward(this.props.items.row[index].name) } key={ index }>
                    { Object.values(this.props.items.row[index]).map((value) => (
                      <StyledTableCell key={ value }>{ value }</StyledTableCell>
                    ))}
                  </TableRow>
                : <TableRow hover onClick={ (e) => this.props.openPreview(this.props.items.row[index].name) } key={ index }>
                    { Object.values(this.props.items.row[index]).map((value) => (
                      <StyledTableCell key={ value }>{ value }</StyledTableCell>
                    ))}
                  </TableRow>
              ))}
          </TableBody>
        </Table>
      </>
    );
  };
}

export default FileListTable;