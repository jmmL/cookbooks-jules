import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, favorites, onToggleFavorite }) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p className="text-xl">No recipes found matching your criteria.</p>
        <p className="mt-2">Try adjusting your filters or search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favorites.includes(recipe.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default RecipeList;
