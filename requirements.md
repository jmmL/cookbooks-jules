# Recipe Indexing Webapp Requirements

## 1. Project Overview
A responsive, single-page web application to allow a household to browse an index of recipes from their owned cookbooks. The app does not store full recipe instructions but indexes metadata to help users find recipes easily.

## 2. Technical Stack
- **Framework**: React (initialized via Vite)
- **Styling**: Tailwind CSS
- **Language**: JavaScript (ES6+) / JSX
- **Hosting**: Static site (GitHub Pages compatible)
- **Data Source**: Local JSON file
- **Persistence**: `localStorage` for user favorites
- **Testing**:
  - Unit: Vitest
  - E2E/UX: Playwright
- **CI/CD**: GitHub Actions

## 3. Data Schema
The recipe data will be stored in a standard JSON format containing the following fields:
- **id**: Unique identifier (string/number)
- **bookName**: Name of the cookbook (string)
- **author**: Author of the book (string)
- **cuisine**: Cuisine type (string, e.g., "Italian", "Chinese")
- **recipeName**: Object containing name variations:
  - `english` (string)
  - `original` (string, optional, e.g., Hanzi)
  - `pronunciation` (string, optional, e.g., Pinyin)
- **theme**: Dish type (string, e.g., "Starter", "Fish", "Meat", "Tofu")
- **times**:
  - `preparation`: Total time in minutes (number)
  - `active`: Active cooking time in minutes (number)
- **difficulty**: Rating (string: "Easy", "Medium", "Hard")
- **ingredients**: List of main ingredients (array of strings)
- **seasonality**: Best season for the dish (string: "Spring", "Summer", "Autumn", "Winter")
- **pageNumber**: Page reference in the physical book (number)

## 4. Functional Requirements

### 4.1. Browsing & Display
- **Recipe Cards**: Display key information clearly (Name, Book, Page, Times, Difficulty).
- **Responsive Design**: optimized for smartphones and desktops.

### 4.2. Search & Filtering
- **Text Search**: Filter by recipe name or ingredients.
- **Quick Filters**: Common tags displayed below the search bar (e.g., "Chicken", "Vegetarian").
- **Detailed Filters**:
  - **Theme**: Dropdown/Select.
  - **Time Ranges**: Buckets (e.g., "< 30 mins", "30-60 mins", "> 60 mins").
  - **Difficulty**: Easy/Medium/Hard.
  - **Seasonality**: Single select (Spring/Summer/Autumn/Winter).
- **Filtering Logic**: All filters should work conjunctively (AND logic).

### 4.3. Favorites
- Users can "heart" or favorite a recipe.
- Favorites are stored in the browser's `localStorage`.
- Ability to filter/view only favorites.

## 5. Testing Strategy
- **Unit Tests**: Verify filtering functions and data parsing logic.
- **E2E Tests**: Use Playwright to simulate user flows:
  - Searching for a recipe.
  - Applying filters.
  - Toggling a favorite and reloading the page to ensure persistence.
  - Verifying layout responsiveness.

## 6. Deployment
- CI pipeline to run tests and build the static assets on push.
