# RouteStitcher

RouteStitcher helps users find train connections, compare route segments, check
seat availability, and open the relevant ticket purchase links.

## Features

- Search connections by departure station, destination station, and date.
- Search and select stations from the station list.
- Display journey timelines with transfers and train brands.
- Check seat availability for two or three tickets.
- Open ticket links for the checked route segments.

## Requirements

- Node.js and npm
- A running RouteStitcher API on `http://localhost:5000`

The frontend sends seat checks to `POST /api/{connectionId}/check`.

## Installation

Install the project dependencies:

```bash
npm install
```

## Development server

Start the Angular development server:

```bash
npm start
```

Then open [http://localhost:4200](http://localhost:4200). The application
reloads automatically when source files change.

## Build

Create a production build in the `dist/` directory:

```bash
npm run build
```

## Tests

Run the unit tests with Vitest:

```bash
npm test
```

## Project structure

- `src/app/components/ticket-search` contains the search form and station suggestions.
- `src/app/components/search-page` loads and displays connection results.
- `src/app/components/connection-card` displays a connection and ticket actions.
- `src/app/components/journey-timeline` renders route segments and seat status.
- `src/app/services` contains API, station, brand, and search services.

## Technology

- Angular 21
- TypeScript
- RxJS
- Angular Forms
- Vitest

For Angular CLI documentation, see the
[Angular CLI documentation](https://angular.dev/tools/cli).
