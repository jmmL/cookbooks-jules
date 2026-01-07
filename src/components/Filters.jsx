import React from 'react';

const Filters = ({
  searchTerm,
  setSearchTerm,
  quickFilters,
  activeQuickFilter,
  setActiveQuickFilter,
  filters,
  setFilters,
  uniqueValues,
  showFavorites,
  setShowFavorites
}) => {

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleQuickFilterClick = (filter) => {
      if (activeQuickFilter === filter.label) {
          // Deselect
          setActiveQuickFilter(null);
          setSearchTerm('');
          setFilters({
              theme: '',
              difficulty: '',
              seasonality: '',
              timeRange: '',
          });
      } else {
          setActiveQuickFilter(filter.label);
          // Apply the quick filter logic
          if (filter.type === 'search') {
              setSearchTerm(filter.value);
              setFilters({
                theme: '',
                difficulty: '',
                seasonality: '',
                timeRange: '',
              });
          } else if (filter.type === 'filter') {
               setSearchTerm('');
               setFilters({
                theme: '',
                difficulty: '',
                seasonality: '',
                timeRange: '',
                [filter.key]: filter.value
              });
          }
      }
  };


  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
      {/* Search Bar */}
      <div className="mb-4">
        <label htmlFor="search" className="sr-only">Search recipes</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search by name or ingredients (e.g. Chicken, Tofu)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {quickFilters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => handleQuickFilterClick(filter)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activeQuickFilter === filter.label
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Detailed Filters Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Theme Filter */}
        <div>
          <label htmlFor="theme" className="block text-xs font-medium text-gray-700 mb-1">Theme</label>
          <select
            id="theme"
            className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-white border"
            value={filters.theme}
            onChange={(e) => handleFilterChange('theme', e.target.value)}
          >
            <option value="">All Themes</option>
            {uniqueValues.themes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Time Filter */}
        <div>
          <label htmlFor="timeRange" className="block text-xs font-medium text-gray-700 mb-1">Total Time</label>
          <select
            id="timeRange"
            className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-white border"
            value={filters.timeRange}
            onChange={(e) => handleFilterChange('timeRange', e.target.value)}
          >
            <option value="">Any Time</option>
            <option value="under_30">Under 30 mins</option>
            <option value="30_60">30 - 60 mins</option>
            <option value="over_60">Over 60 mins</option>
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label htmlFor="difficulty" className="block text-xs font-medium text-gray-700 mb-1">Difficulty</label>
          <select
            id="difficulty"
            className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-white border"
            value={filters.difficulty}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
          >
            <option value="">Any Difficulty</option>
            {uniqueValues.difficulties.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {/* Seasonality Filter */}
        <div>
          <label htmlFor="seasonality" className="block text-xs font-medium text-gray-700 mb-1">Season</label>
          <select
            id="seasonality"
            className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-white border"
            value={filters.seasonality}
            onChange={(e) => handleFilterChange('seasonality', e.target.value)}
          >
            <option value="">All Seasons</option>
            {uniqueValues.seasonalities.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

         {/* Favorites Toggle */}
         <div className="flex items-end">
            <button
                onClick={() => setShowFavorites(!showFavorites)}
                className={`w-full flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    showFavorites
                    ? 'border-transparent text-white bg-red-600 hover:bg-red-700'
                    : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                }`}
            >
                {showFavorites ? 'Show All' : '♥ Favorites Only'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
