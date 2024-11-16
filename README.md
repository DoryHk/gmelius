
# Bird Sounds Project

This project is a Vue 3 application built with Pinia for state management, Vuetify for UI components, and TypeScript for type safety. It fetches bird sound recordings from the Xeno Canto API and displays them in a data table with pagination and a filter to show sounds shorter than 30 seconds.

## Requirements

1. Vue.js 3
2. Pinia (for state management)
3. Vuetify (UI library)
4. TypeScript
5. Axios (for API requests)
6. Vitest

## Installation

To get started, clone this repository and install the dependencies:

```bash
git clone https://github.com/DoryHk/gmelius.git
cd gmelius
npm install
```

## Running the Development Server

Once dependencies are installed, you can run the development server using:

```bash
npm run dev
```

This will start the app and make it accessible at `http://localhost:5173/gmelius` by default.

## Project Structure

- **`src/`**: Contains all the source files for the application.
  - **`composables/`**: Holds the `useBirdSounds` composable for managing the API request and the sound data.
  - **`components/`**: Contains components like `ImageViewer.vue` to display images for the sounds.
  - **`stores/`**: Contains the Pinia store for managing the bird sounds state.
  - **`views/`**: Contains the main application view where the sound data table is displayed.
  - **`App.vue`**: The root Vue component.
  - **`main.ts`**: The entry point for the Vue app.
 
## Unit Test

To run the unit test

```bash
npm run test:unit
```
