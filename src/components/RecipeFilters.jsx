import { CATEGORIES } from "../interfaces/recipe";

// Search box, category dropdown and "favorites only" switch.
function RecipeFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  onlyFavorites,
  onOnlyFavoritesChange,
}) {
  return (
    <div className="row g-2 align-items-center mb-4">
      <div className="col-12 col-md-5">
        <input
          type="search"
          className="form-control"
          placeholder="🔍 Tarif veya malzeme ara..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="col-7 col-md-4">
        <select
          className="form-select"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">Tüm kategoriler</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="col-5 col-md-3">
        <div className="form-check form-switch">
          <input
            id="onlyFavorites"
            type="checkbox"
            className="form-check-input"
            checked={onlyFavorites}
            onChange={(e) => onOnlyFavoritesChange(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="onlyFavorites">
            ★ Favoriler
          </label>
        </div>
      </div>
    </div>
  );
}

export default RecipeFilters;
