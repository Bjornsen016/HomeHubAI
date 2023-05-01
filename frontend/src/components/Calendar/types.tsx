export interface EventType {
  id: string;
  summary: string;
  description: string;
  start: {
    dateTime: Date;
  };
  end: {
    dateTime: Date;
  };
  creator: {
    displayName: string;
    email: string;
  };
  color: string;
}
