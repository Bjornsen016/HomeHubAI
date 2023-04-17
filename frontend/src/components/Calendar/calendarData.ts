import { EventType } from './types';

export const dummyEvents: EventType[] = [
  {
    id: '1',
    summary: 'Event 1',
    description: 'This is a sample event.',
    start: { dateTime: new Date() },
    end: { dateTime: new Date() },
    creator: {
      displayName: 'John Doe',
      email: 'john.doe@example.com',
    },
  },
  // Add more dummy events if needed
];
