import React from 'react';
import { ISSUE_CATEGORIES, SORT_OPTIONS } from '../utils/constants';
import { FiSearch, FiFilter } from 'react-icons/fi';
import './FeedFilter.css';

export default function FeedFilter({ onFilterChange, filters }) {
  const [localFilters, setLocalFilters] = React.useState(filters);
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...localFilters, [name]: value };
    setLocalFilters(updated);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  const handleReset = () => {
    const reset = { search: '', city: '', category: '', status: '', sortBy: 'latest' };
    setLocalFilters(reset);
    onFilterChange(reset);
  };

  return (
    <div className="feed-filter">
      <form onSubmit={handleSearch} className="filter-form">
        <div className="search-input-group">
          <FiSearch className="search-icon" />
          <input
            type="text"
            name="search"
            placeholder="Search by title, location, or description..."
            value={localFilters.search || ''}
            onChange={handleChange}
            className="search-input"
          />
        </div>

        <button type="submit" className="btn btn-primary search-btn">
          Search
        </button>

        <button
          type="button"
          className="btn btn-outline filter-toggle"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <FiFilter />
          Filters
        </button>
      </form>

      {showAdvanced && (
        <div className="advanced-filters">
          <div className="filter-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter city name"
              value={localFilters.city || ''}
              onChange={handleChange}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={localFilters.category || ''}
              onChange={handleChange}
            >
              <option value="">All Categories</option>
              {ISSUE_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={localFilters.status || ''}
              onChange={handleChange}
            >
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sortBy">Sort By</label>
            <select
              id="sortBy"
              name="sortBy"
              value={localFilters.sortBy || 'latest'}
              onChange={handleChange}
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <button type="button" onClick={handleReset} className="btn btn-outline btn-block">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
