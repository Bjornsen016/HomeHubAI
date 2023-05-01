import React, { useState, useEffect } from 'react';
import { EventApi, CalendarOptions } from '@fullcalendar/common';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import styles from './Calendar.module.css';
import EventDialog from './EventDialog';
import { Container, Tooltip, Box } from '@mui/material';
import { EventType } from './types';
import CalendarSelector from './CalendarSelector';
import { useUserAuthContext } from '../../UserAuthProvider';

interface CalendarProps {
  isSmallView?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ isSmallView }) => {
  const { accessToken, setAccessToken, userInfo } = useUserAuthContext();
  const [calendarList, setCalendarList] = useState([]);
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [colors, setColors] = useState<any>([]);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipAnchorEl, setTooltipAnchorEl] = useState<Element | null>(null);

  const handleMouseEnter = (eventInfo: any) => {
    setTooltipContent(
      eventInfo.event.extendedProps.description || 'No description'
    );
    setTooltipAnchorEl(eventInfo.el);
    setTooltipOpen(true);
  };

  const handleMouseLeave = () => {
    setTooltipOpen(false);
  };

  const refreshAccessTokenIfExpired = async () => {
    if (!accessToken || !userInfo) return;
    const currentTime = new Date();
    const expirationTime = new Date(accessToken.expiryTime);

    if (currentTime >= expirationTime) {
      const response = await fetch(
        `http://localhost:5001/api/auth/refreshAccessToken`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userEmail: userInfo.email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAccessToken({
          token: data.accessToken,
          expiryTime: new Date(data.accessTokenExpirationTime),
        });
      } else {
        console.error('Failed to refresh access token');
      }
    }
  };

  const convertEvents = (event: any) => ({
    id: event.id,
    title: event.summary,
    start: event.start?.dateTime || event.start?.date,
    end: event.end?.dateTime || event.end?.date,
    extendedProps: {
      description: event.description,
      creator: event.creator,
    },
    backgroundColor: colors[event.colorId]?.background,
  });

  const headerToolbarOptions: CalendarOptions['headerToolbar'] = isSmallView
    ? {
        left: 'prev,next today',
        center: 'title',
        right: '',
      }
    : {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      };

  const handleClickOpen = (event: EventApi) => {
    const selectedEvent: EventType = {
      id: event.id,
      summary: event.title,
      start: {
        dateTime: event.start || new Date(),
      },
      end: {
        dateTime: event.end || event.start || new Date(),
      },
      creator: event.extendedProps.creator,
      description: event.extendedProps.description,
      color: event.backgroundColor,
    };

    setSelectedEvent(selectedEvent);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (!accessToken) return;
    (async () => { await refreshAccessTokenIfExpired(); })();
    const fetchEvents = async () => {
      if (selectedCalendars.length === 0) {
        // No selected calendars
        var col = await fetch('https://www.googleapis.com/calendar/v3/colors', {
      headers: {
        Authorization: `Bearer ${accessToken.token}`,
      },
    });
    var color = await col.json();
    setColors(color.event);
        const responseList = await fetch(
          'https://www.googleapis.com/calendar/v3/users/me/calendarList',
          {
            headers: {
              Authorization: `Bearer ${accessToken.token}`,
            },
          }
        );
    
        if (responseList.ok) {
          const data = await responseList.json();
    
          setCalendarList(
            data.items.map((calendar: any) => ({
              id: calendar.id,
              summary: calendar.summary,
            }))
          );
        }
      } else {
        // Fetch events for the selected calendars
        let events: any = [];

        const fetchData = async (calendar: string) => {
          const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${calendar}/events`,
            {
              headers: {
                Authorization: `Bearer ${accessToken.token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            events = events.concat(data.items.map(convertEvents));
          } else {
            console.error('Failed to fetch calendar events');
          }
        };

        for (const calendar of selectedCalendars) {
          await fetchData(calendar);
        }
        setCalendarEvents(events);
      }
    };
    fetchEvents();
  }, [accessToken, selectedCalendars]);

  return (
    <Container className={styles.calendarContainer}>
      {accessToken ? (
        <>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView={isSmallView ? 'listWeek' : 'dayGridMonth'}
            height="90%"
            events={calendarEvents}
            eventClick={(eventClickInfo) => {
              handleClickOpen(eventClickInfo.event);
            }}
            eventMouseEnter={handleMouseEnter}
            eventMouseLeave={handleMouseLeave}
            firstDay={1} // Start weeks on Monday
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hourCycle: 'h23', // Use the 24-hour system
            }}
            headerToolbar={headerToolbarOptions}
            views={{
              timeGridWeek: {
                slotLabelFormat: {
                  hour: '2-digit',
                  minute: '2-digit',
                  hourCycle: 'h23',
                },
              },
              timeGridDay: {
                slotLabelFormat: {
                  hour: '2-digit',
                  minute: '2-digit',
                  hourCycle: 'h23',
                },
              },
              listWeek: {
                listDayFormat: {
                  hour: '2-digit',
                  minute: '2-digit',
                  hourCycle: 'h23',
                },
              },
            }}
          />

          <Box display="flex" justifyContent="center" alignItems="center">
            <CalendarSelector
              calendarList={calendarList}
              selectedCalendars={selectedCalendars}
              setSelectedCalendars={setSelectedCalendars}
            />
          </Box>

          <EventDialog
            open={openDialog}
            event={selectedEvent}
            onClose={handleClose}
          />
        </>
      ) : (
        <div>Please log in</div>
      )}
      <Tooltip
        open={tooltipOpen}
        title={tooltipContent}
        placement="top"
        arrow
        PopperProps={{
          anchorEl: tooltipAnchorEl,
          container: () =>
            document.querySelector('.' + styles.calendarContainer),
        }}
      >
        <div />
      </Tooltip>
    </Container>
  );
};

export default Calendar;