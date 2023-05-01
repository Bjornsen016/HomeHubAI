import React, { useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useUserAuthContext } from '../../UserAuthProvider';


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
  const { userInfo } = useUserAuthContext();

  const handleCalendarToggle = (calendarId: string) => {
    if (selectedCalendars.includes(calendarId)) {
      setSelectedCalendars(selectedCalendars.filter((id) => id !== calendarId));
    } else {
      setSelectedCalendars([...selectedCalendars, calendarId]);
    }
  };

  useEffect(() => {
    // Get user settings for selectedCalendars
    const fetchUserSettings = async () => {
      if (userInfo) {
        const response = await fetch(`http://localhost:5001/api/user/getSettings/${userInfo.email}`);
        const data = await response.json();
        if (data.selectedCalendars) {
          setSelectedCalendars(data.selectedCalendars);
        }
      }
    };
    fetchUserSettings();
  }, [userInfo]);

  useEffect(() => {  
    // Update user settings for selectedCalendars
    const updateSelectedCalendars = async () => {
      if(selectedCalendars.length === 0) return;
      if (userInfo) {
        await fetch(`http://localhost:5001/api/user/updateSettings/${userInfo.email}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedCalendars: selectedCalendars }),
        });
      }
    };
  
    updateSelectedCalendars();
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