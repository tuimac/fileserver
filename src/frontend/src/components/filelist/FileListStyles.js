import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#37474f',
    color: '#CCCED7',
    fontSize: 20,
    fontWeight: 'bold',
    border: '1px solid #9A9A9C'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));