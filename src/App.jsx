import { useState, useMemo } from 'react';
import RecipeList from './components/RecipeList';
import Filters from './components/Filters';
import recipesData from './data/recipes.json';

function App() {
  const [recipes] = useState(recipesData);
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error('Failed to parse favorites from localStorage:', error);
      return [];
    }
  });

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    theme: '',
    difficulty: '',
    seasonality: '',
    timeRange: '',
  });
  const [activeQuickFilter, setActiveQuickFilter] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorite = (id) => {
    let newFavorites;
    if (favorites.includes(id)) {
      newFavorites = favorites.filter(favId => favId !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Derive unique values for dropdowns
  const uniqueValues = useMemo(() => {
    const themes = [...new Set(recipes.map(r => r.theme))].sort();
    const difficulties = [...new Set(recipes.map(r => r.difficulty))].sort(); // Could order custom
    const seasonalities = [...new Set(recipes.map(r => r.seasonality))].sort();
    return { themes, difficulties, seasonalities };
  }, [recipes]);

  const quickFilters = [
      { label: 'Chicken', type: 'search', value: 'Chicken' },
      { label: 'Vegetarian', type: 'filter', key: 'theme', value: 'Vegetarian' },
      { label: 'Easy', type: 'filter', key: 'difficulty', value: 'Easy' },
      { label: 'Under 30m', type: 'filter', key: 'timeRange', value: 'under_30' },
  ];

  // Filtering Logic
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // 1. Favorites
      if (showFavorites && !favorites.includes(recipe.id)) return false;

      // 2. Search Term (Name or Ingredients)
      if (searchTerm) {
        const term = searchTerm.toLowerCase();

        // Defensive coding for Name
        const englishName = recipe.recipeName?.english?.toLowerCase() || '';
        const originalName = recipe.recipeName?.original?.toLowerCase() || '';
        const matchesName = englishName.includes(term) || originalName.includes(term);

        // Defensive coding for Ingredients
        const ingredients = recipe.ingredients || [];
        const matchesIngredient = ingredients.some(ing => ing.toLowerCase().includes(term));

        if (!matchesName && !matchesIngredient) return false;
      }

      // 3. Theme
      if (filters.theme && recipe.theme !== filters.theme) return false;

      // 4. Difficulty
      if (filters.difficulty && recipe.difficulty !== filters.difficulty) return false;

      // 5. Seasonality
      if (filters.seasonality && recipe.seasonality !== filters.seasonality) return false;

      // 6. Time Range
      if (filters.timeRange) {
        const totalTime = recipe.times.preparation; // Total time = preparation (which includes active)
        if (filters.timeRange === 'under_30' && totalTime >= 30) return false;
        if (filters.timeRange === '30_60' && (totalTime < 30 || totalTime > 60)) return false;
        if (filters.timeRange === 'over_60' && totalTime <= 60) return false;
      }

      return true;
    });
  }, [recipes, favorites, searchTerm, filters, showFavorites]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Recipe Index</h1>
          <div className="text-sm text-gray-500">
             {filteredRecipes.length} found
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          quickFilters={quickFilters}
          activeQuickFilter={activeQuickFilter}
          setActiveQuickFilter={setActiveQuickFilter}
          filters={filters}
          setFilters={setFilters}
          uniqueValues={uniqueValues}
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
        />

        <RecipeList
          recipes={filteredRecipes}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </main>
    </div>
  );
}

export default App;
