import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock recipes data to have consistent test data
vi.mock('./data/recipes.json', () => ({
  default: [
    {
      "id": 1,
      "bookName": "Test Book",
      "author": "Test Author",
      "cuisine": "Test Cuisine",
      "recipeName": {
        "english": "Chicken Soup",
        "original": "",
        "pronunciation": ""
      },
      "theme": "Soup",
      "times": {
        "preparation": 20,
        "active": 10
      },
      "difficulty": "Easy",
      "ingredients": ["Chicken", "Water", "Salt"],
      "seasonality": "Winter",
      "pageNumber": 1
    },
    {
      "id": 2,
      "bookName": "Test Book 2",
      "author": "Test Author 2",
      "cuisine": "Test Cuisine 2",
      "recipeName": {
        "english": "Beef Stew",
        "original": "",
        "pronunciation": ""
      },
      "theme": "Meat",
      "times": {
        "preparation": 120,
        "active": 30
      },
      "difficulty": "Medium",
      "ingredients": ["Beef", "Carrots"],
      "seasonality": "Winter",
      "pageNumber": 2
    }
  ]
}));

describe('App', () => {
  it('renders the title', () => {
    render(<App />);
    expect(screen.getByText('Recipe Index')).toBeInTheDocument();
  });

  it('displays all recipes initially', () => {
    render(<App />);
    expect(screen.getByText('Chicken Soup')).toBeInTheDocument();
    expect(screen.getByText('Beef Stew')).toBeInTheDocument();
  });

  it('filters by search term (name)', async () => {
    render(<App />);
    const user = userEvent.setup();
    const searchInput = screen.getByPlaceholderText(/search/i);

    await user.type(searchInput, 'Chicken');

    expect(screen.getByText('Chicken Soup')).toBeInTheDocument();
    expect(screen.queryByText('Beef Stew')).not.toBeInTheDocument();
  });

   it('filters by search term (ingredient)', async () => {
    render(<App />);
    const user = userEvent.setup();
    const searchInput = screen.getByPlaceholderText(/search/i);

    await user.type(searchInput, 'Carrots');

    expect(screen.queryByText('Chicken Soup')).not.toBeInTheDocument();
    expect(screen.getByText('Beef Stew')).toBeInTheDocument();
  });

  it('filters by difficulty', async () => {
    render(<App />);
    const user = userEvent.setup();
    const difficultySelect = screen.getByLabelText('Difficulty');

    await user.selectOptions(difficultySelect, 'Medium');

    expect(screen.queryByText('Chicken Soup')).not.toBeInTheDocument();
    expect(screen.getByText('Beef Stew')).toBeInTheDocument();
  });

  it('toggles favorites', async () => {
      render(<App />);
      const user = userEvent.setup();

      // Find the favorite button for the first recipe (Chicken Soup)
      const buttons = screen.getAllByRole('button', { name: /add to favorites/i });
      await user.click(buttons[0]);

      // Check if it's now in favorites mode
      // This part is tricky without querying the specific icon, but we can check if the filter works

      const favFilterBtn = screen.getByText('♥ Favorites Only');
      await user.click(favFilterBtn);

      expect(screen.getByText('Chicken Soup')).toBeInTheDocument();
      expect(screen.queryByText('Beef Stew')).not.toBeInTheDocument();
  });
});
