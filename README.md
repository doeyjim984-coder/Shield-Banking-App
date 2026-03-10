# Shield Banking App

A modern, responsive banking dashboard built with React, TypeScript, and Tailwind CSS.

This project showcases a polished personal banking experience with animated UI sections, transfer flow simulation, virtual card views, and transaction insights.

## Features

- Responsive dashboard layout for desktop and mobile
- Sidebar navigation with tab-based views
- Smart Wallet overview with balance and quick stats
- Transaction list with mock transaction data
- Spending chart visualization section
- Quick send contacts and quick action shortcuts
- Virtual card UI component
- Transfer flow simulation that updates local state
- Light/Dark theme toggle
- Skeleton loading states and smooth transitions using Framer Motion

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- ESLint

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open the app at `http://localhost:5173`.

## Available Scripts

- `npm run dev`: Start Vite development server
- `npm run build`: Type-check and build for production
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint

## Project Structure

```text
src/
  components/        # Shared UI components (Sidebar, Skeleton, ThemeToggle)
  features/
    dashboard/       # Dashboard widgets (charts, quick actions)
    transactions/    # Transaction list UI
    transfer/        # Transfer flow
    virtual-card/    # Virtual card component
  types/             # Shared TypeScript types
  utils/             # Utility functions and mock data
  App.tsx            # Main app layout and tab orchestration
  main.tsx           # Application entry point
```

## Notes

- The app currently uses local mock data in `src/utils/mock-data.ts`.
- Transfers update UI state only (no backend persistence).

## Roadmap

- Add authentication and protected routes
- Connect to a real backend/API
- Add form validation and error handling
- Add unit and integration tests

## License

This project is available under the MIT License.
