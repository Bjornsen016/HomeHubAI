# HomeHubAI

HomeHubAI is a customizable dashboard application that provides users with essential information, such as weather forecasts, calendar events, and tasks, all in one place. The application is designed to be flexible and extensible, allowing developers to create their own components and widgets.

## Features

- Weather widget: Displays the current weather conditions and a forecast for a specified location.
- Calendar: Integrates with Google Calendar to show upcoming events from selected calendars.
- Tasks: Displays the user's tasks from their connected Google account.
- Dark mode: Users can toggle between light and dark themes.

## Stack

- Frontend: React, TypeScript, Material-UI
- Backend: C# with ASP.NET Core
- Database: Google Firebase Firestore

## Developing Your Own Component

To create a new component for HomeHubAI, follow these steps:

1. Create a new folder inside the `components` directory with the name of your component.
2. Inside the new folder, create a TypeScript file with the same name as the folder. For example, if you're creating a "NewsHeadlines" component, create a file named `NewsHeadlines.tsx`.
3. In the new TypeScript file, import React and any necessary libraries. Then, create a functional component with the desired functionality.
4. Export the component and add it to the `MainLayout.tsx` file or any other desired location within the application.
5. Test your component to ensure it works as expected and integrates well with the existing application.

## Issues and Bug Reporting

If you encounter a bug or would like to request a feature, please create an issue on the GitHub repository. To do this:

1. Go to the repository's "Issues" tab on GitHub.
2. Click the "New Issue" button.
3. Provide a descriptive title for the issue.
4. In the main text box, describe the issue or feature request in detail, providing any relevant information such as steps to reproduce the bug or a description of the desired functionality.
5. Submit the issue by clicking the "Submit new issue" button.

## Contributions

We welcome contributions from the community! If you'd like to contribute to HomeHubAI, please follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bugfix.
4. Implement your changes, following the guidelines for developing a new component or making adjustments to existing components.
5. Commit and push your changes to your fork.
6. Create a pull request on GitHub, detailing the changes you've made and their purpose.

## TODO

- [ ] Publish the application on Replit for easy access and sharing.
- [ ] Create a bus timetable component that shows the upcoming buses for a specified stop.
- [ ] Create a news headlines component that displays the latest headlines from a selected news source.
- [ ] Enhance the weather widget to allow users to click and choose their preferred location.
