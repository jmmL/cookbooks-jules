# Recipe Indexing Webapp

A responsive, single-page web application designed to index and browse recipes from a household's cookbook collection. This application allows users to find recipes based on ingredients, themes, cooking time, difficulty, and seasonality without needing to flip through physical books first.

## Features

- **📖 Recipe Indexing**: Browse recipes with details like Book Name, Author, Cuisine, Page Number, and Times.
- **🔍 Smart Search**: Filter recipes by name or ingredients instantly.
- **⚡ Quick Filters**: One-click access to common categories (e.g., "Chicken", "Vegetarian", "Under 30m").
- **🎛️ Advanced Filtering**:
  - **Theme**: Filter by dish type (Starter, Meat, Fish, Tofu, etc.).
  - **Time**: Filter by total preparation time (Under 30m, 30-60m, Over 60m).
  - **Difficulty**: Easy, Medium, Hard.
  - **Seasonality**: Find the perfect dish for the current season.
- **❤️ Favorites**: Save your go-to recipes. Favorites are stored locally on your device.
- **📱 Responsive Design**: Optimized for both desktop and mobile use.

## Tech Stack

- **Framework**: [React](https://react.dev/) (v18+)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**:
  - Unit: [Vitest](https://vitest.dev/)
  - E2E: [Playwright](https://playwright.dev/)
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

### Building for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist` directory, ready for deployment to static hosting services like GitHub Pages.

## Testing

### Unit Tests
Run unit tests to verify component logic and filtering:
```bash
npm test
```

### End-to-End (E2E) Tests
Run E2E tests to verify user flows and UI:
```bash
npx playwright test
```

## Data Management

Recipes are currently stored in `src/data/recipes.json`. To add new recipes, edit this file following the existing JSON structure.

## License

MIT
