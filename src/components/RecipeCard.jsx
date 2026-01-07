const RecipeCard = ({ recipe, isFavorite, onToggleFavorite }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wide">
              {recipe.cuisine}
            </span>
             <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wide">
              {recipe.theme}
            </span>
          </div>
          <button
            onClick={() => onToggleFavorite(recipe.id)}
            className={`focus:outline-none transition-colors duration-200 ${
              isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-300 hover:text-gray-400'
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={isFavorite ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-1 leading-tight">
          {recipe.recipeName.english}
        </h3>
        {recipe.recipeName.original && (
            <p className="text-gray-500 text-sm mb-1 font-medium">
              {recipe.recipeName.original} <span className="text-gray-400 font-normal">({recipe.recipeName.pronunciation})</span>
            </p>
        )}

        <div className="mt-3 text-sm text-gray-600 space-y-1">
           <p className="flex items-center">
            <span className="font-medium mr-2 w-20">Book:</span>
             <span className="truncate">{recipe.bookName}</span>
          </p>
          <p className="flex items-center">
            <span className="font-medium mr-2 w-20">Author:</span>
            <span className="truncate">{recipe.author}</span>
          </p>
           <p className="flex items-center">
            <span className="font-medium mr-2 w-20">Page:</span>
            {recipe.pageNumber}
          </p>
        </div>

        <div className="mt-4 border-t pt-3 flex flex-wrap gap-2 text-xs text-gray-500">
           <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
             <span className="font-semibold mr-1">Prep:</span> {recipe.times.preparation}m
           </div>
           <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
             <span className="font-semibold mr-1">Active:</span> {recipe.times.active}m
           </div>
           <div className={`flex items-center px-2 py-1 rounded ${
               recipe.difficulty === 'Easy' ? 'bg-green-50 text-green-700' :
               recipe.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
               'bg-red-50 text-red-700'
           }`}>
             <span className="font-semibold mr-1">Diff:</span> {recipe.difficulty}
           </div>
             <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
             <span className="font-semibold mr-1">Season:</span> {recipe.seasonality}
           </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
