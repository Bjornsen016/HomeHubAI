// BusTimetable.tsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const dummyData = [
  {
    line: '1',
    destination: 'Central Station',
    departureTime: '14:35',
  },
  {
    line: '2',
    destination: 'East Street',
    departureTime: '14:40',
  },
  {
    line: '3',
    destination: 'West Park',
    departureTime: '14:45',
  },
  {
    line: '1',
    destination: 'Central Station',
    departureTime: '14:50',
  },
];

const BusTimetable: React.FC = () => {
  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Line</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Departure</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyData.map((entry, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor:
                  index % 2 === 0 ? theme.palette.action.hover : 'inherit',
              }}
            >
              <TableCell>{entry.line}</TableCell>
              <TableCell>{entry.destination}</TableCell>
              <TableCell>{entry.departureTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BusTimetable;
