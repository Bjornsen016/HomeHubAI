import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { EventType } from './types';

interface EventDialogProps {
  open: boolean;
  event: EventType | null;
  onClose: () => void;
}

const EventDialog: React.FC<EventDialogProps> = ({ open, event, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {event && (
        <>
          <DialogTitle>{event.summary}</DialogTitle>
          <DialogContent sx={{ backgroundColor: event.color }}>
            <DialogContentText>
              <h3>{event.summary}</h3>
              <p>
                <strong>Creator:</strong>{' '}
                {event.creator.displayName || event.creator.email}
              </p>
              <p>
                <strong>Start:</strong> {event.start.dateTime?.toLocaleString()}
              </p>
              <p>
                <strong>End:</strong> {event.end.dateTime?.toLocaleString()}
              </p>
              {event.description && (
                <>
                  <strong>Description:</strong>
                  <p>{event.description}</p>
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Close</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default EventDialog;
