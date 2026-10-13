# Zuvomo React Native Assignment

A simple React Native application built using Expo and JavaScript as part of the Zuvomo assignment.

## Features

- Fetches posts from JSONPlaceholder public API.
- Displays posts in a clean and user-friendly list.
- Opens a detailed screen when a post is selected.
- Displays loading indicators while fetching data.
- Handles API errors with a retry option.
- Supports pull-to-refresh functionality.
- Uses React Navigation for screen navigation.

## Tech Stack

- React Native
- Expo
- JavaScript
- React Navigation
- JSONPlaceholder API

## API Used

https://jsonplaceholder.typicode.com/posts

## Project Setup

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd ZuvomoTask
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the Expo development server:

   ```bash
   npx expo start
   ```

5. Scan the QR code using Expo Go on your device, or press `a` to open the Android emulator.

## Project Structure

```text
ZuvomoTask/
├── App.js
├── README.md
└── src/
    ├── components/
    │   └── PostCard.js
    ├── navigation/
    │   └── AppNavigator.js
    ├── screens/
    │   ├── HomeScreen.js
    │   └── DetailScreen.js
    ├── services/
    │   └── api.js
    └── styles/
        └── theme.js
```

## Author

Brijesh Singh