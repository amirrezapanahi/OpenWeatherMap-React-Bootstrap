# OpenWeatherMap React + Bootstrap

A simple weather app built with React and React‑Bootstrap that fetches current conditions from OpenWeatherMap. Includes a dark UI theme, search by city, unit switching, geolocation, and production Docker packaging via NGINX.

## Features

- City search with Enter‑to‑search and a visible Search button
- Unit toggle: Celsius (°C) and Fahrenheit (°F), persisted in `localStorage`
- Geolocation button to use the user’s current location
- Weather icon and description from OpenWeatherMap
- Clear loading and error states
- Last updated timestamp
- Dark, accessible color scheme

## Screenshots

- Coming soon (add your screenshots here)

## Getting Started (Local)

Prerequisites:
- Node.js 16+ and npm
- An OpenWeatherMap API key

Steps:
- Copy `.env.example` to `.env` and set your API key:
  - `REACT_APP_API_KEY=your_openweathermap_api_key`
- Install and run:
  - `npm ci`
  - `npm start`
- Open `http://localhost:3000` in your browser.

## Environment Variables

- `REACT_APP_API_KEY` (required): your OpenWeatherMap API key. Note: Create React App only exposes variables prefixed with `REACT_APP_`.

## Docker (Production)

This repo includes a multi‑stage Dockerfile that builds the app and serves it with NGINX. Because Create React App inlines env vars at build time, pass your API key at build.

Build the image:
- `docker build -t owm-react --build-arg REACT_APP_API_KEY=YOUR_KEY .`

Run the container:
- `docker run --rm -p 8080:80 owm-react`
- App is available at `http://localhost:8080`

Notes:
- The container serves a static production build. To change the API key, rebuild the image with a new `--build-arg`.

## UI/UX Improvements

- Added unit toggle with persistence
- Added geolocation support and graceful errors
- Fixed Enter‑to‑search; improved placeholders and labels
- Display weather icons and descriptions
- Better loading and error feedback
- Minor accessibility and contrast adjustments

## Project Structure

- `src/App.js` – main UI and fetch logic
- `src/components/Header.js` – top navigation bar
- `.env.example` – env var template
- `Dockerfile` – multi‑stage build and NGINX serve
- `nginx.conf` – SPA routing fallback

## Scripts

- `npm start` – run locally (development)
- `npm run build` – build production bundle
- `npm test` – run tests (CRA defaults; may not be updated for this UI)

## Notes

- Tests in `src/App.test.js` are from CRA boilerplate and may not reflect the current UI. Update or remove as needed.
- Do not commit a real `.env` with secrets. Use `.env.example`.

## License

See `LICENSE` for details.
