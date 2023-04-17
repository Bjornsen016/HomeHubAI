import React, { useState } from 'react';
import { dummyEvents } from './calendarData';
import EventApi from '@fullcalendar/react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { EventType } from './types';

const Calendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = (event: EventApi) => {
    const eventData: EventType = {
      id: event.id,
      summary: event.title,
      description: event.extendedProps.description,
      start: { dateTime: event.start },
      end: { dateTime: event.end },
      creator: event.extendedProps.creator,
    };
    setSelectedEvent(eventData);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Calendar
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyEvents.map((event) => (
              <TableRow
                key={event.id}
                hover
                onClick={() => handleClickOpen(event)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.startDate.toLocaleDateString()}</TableCell>
                <TableCell>
                  {event.startDate.toLocaleTimeString()} -{' '}
                  {event.endDate.toLocaleTimeString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={openDialog} onClose={handleClose}>
        {selectedEvent && (
          <>
            <DialogTitle>{selectedEvent.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Date: {selectedEvent.startDate.toLocaleDateString()}
              </DialogContentText>
              <DialogContentText>
                Time: {selectedEvent.startDate.toLocaleTimeString()} -{' '}
                {selectedEvent.endDate.toLocaleTimeString()}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Calendar;
