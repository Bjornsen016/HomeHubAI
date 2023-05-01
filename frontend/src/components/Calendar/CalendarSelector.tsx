import React, { useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

interface CalendarSelectorProps {
  calendarList: any[];
  selectedCalendars: string[];
  setSelectedCalendars: React.Dispatch<React.SetStateAction<string[]>>;
}

const CalendarSelector: React.FC<CalendarSelectorProps> = ({
  calendarList,
  selectedCalendars,
  setSelectedCalendars,
}) => {
  const handleCalendarToggle = (calendarId: string) => {
    if (selectedCalendars.includes(calendarId)) {
      setSelectedCalendars(selectedCalendars.filter((id) => id !== calendarId));
    } else {
      setSelectedCalendars([...selectedCalendars, calendarId]);
    }
  };

  useEffect(() => {
    const storedCalendars = JSON.parse(
      localStorage.getItem('selected_calendars') || '[]'
    );
    if (storedCalendars.length > 0) {
      setSelectedCalendars(storedCalendars);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'selected_calendars',
      JSON.stringify(selectedCalendars)
    );
  }, [selectedCalendars]);

  return (
    <div>
      {calendarList.map((calendar) => (
        <FormControlLabel
          key={calendar.id}
          control={
            <Checkbox
              checked={selectedCalendars.includes(calendar.id)}
              onChange={() => handleCalendarToggle(calendar.id)}
            />
          }
          label={calendar.summary}
        />
      ))}
    </div>
  );
};

export default CalendarSelector;