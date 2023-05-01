# HomeHubAI
HomeHubAI is a customizable dashboard application that provides users with personalized widgets such as calendar events, weather, and more. The application is built using React for the frontend, Material-UI for styling, and Firebase for the backend. Users can easily add their own custom components to expand the functionality of the dashboard.

## Features
- Calendar events: Display events from your Google Calendar
- Weather widget: Show the current weather and forecast for a specific location
- Theme customization: Toggle between light and dark mode
- Customizable layout: Arrange widgets according to your preference

## Stack
- Frontend: React
- UI framework: Material-UI
- Backend: Firebase

## How to use the application
1. Clone the repository
2. Install the required dependencies by running npm install
3. Start the development server with npm start
4. Open a browser and navigate to http://localhost:3000
5. Log in with your Google account
6. Customize your dashboard by adding or removing widgets

## Developing your own component
To develop your own component that fits into the application, follow these steps:

1. Create a new folder under src/components for your custom component.
2. Inside the folder, create a file named index.tsx for your component implementation.
3. Import React and any other required dependencies.
4. Create a functional component for your custom widget.
5. Implement the logic and UI for your component using React and Material-UI components.
6. Export your custom component.
7. Import and add your custom component to the src/components/Home.tsx file.
8. Optionally, you can create a context provider for your component if it needs to share state with other components.

Example:

```javascript
// src/components/MyCustomComponent/index.tsx

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const MyCustomComponent: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">My Custom Component</Typography>
        {/* Add your custom component logic and UI here */}
      </CardContent>
    </Card>
  );
};

export default MyCustomComponent;
```
## TODO
- [ ] Publish application on Replit
- [ ] Create the bus table component
- [ ] Create a news headlines component
- [ ] Make the weather widget be able to be clicked to choose the location
- [ ] Improve user authentication and account management
- [ ] Add support for additional widgets and APIs
- [ ] Implement user-specific settings storage in Firebase
- [ ] Enhance widget layout customization options
- [ ] Create a step-by-step user onboarding process
## Contributing
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes to the new branch.
4. Push your changes to your forked repository.
5. Create a pull request to the original repository.

When contributing, please follow the best practices for writing clean and maintainable code. Make sure to document your code and provide clear instructions on how to use any new features.

## License
This project is licensed under the MIT License.
