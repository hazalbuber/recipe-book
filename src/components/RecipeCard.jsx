import { useState } from "react";
import { CATEGORY_EMOJI } from "../interfaces/recipe";

// Shows a single recipe as a card. Instructions are hidden until "Tarifi göster" is clicked.
function RecipeCard({ recipe, onToggleFavorite, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const emoji = CATEGORY_EMOJI[recipe.category] ?? "🍽️";

  return (
    <div className="card recipe-card h-100">
      <div className="recipe-card__top">
        <span className="recipe-card__emoji">{emoji}</span>
        <button
          type="button"
          className="recipe-card__fav"
          onClick={() => onToggleFavorite(recipe.id)}
          title={recipe.favorite ? "Favorilerden çıkar" : "Favorilere ekle"}
        >
          {recipe.favorite ? "★" : "☆"}
        </button>
      </div>

      <div className="card-body d-flex flex-column">
        <span className="badge rounded-pill recipe-badge mb-2 align-self-start">
          {recipe.category}
        </span>
        <h3 className="h5">{recipe.title}</h3>
        <p className="text-muted small mb-3">⏱ {recipe.duration} dk</p>

        <h4 className="recipe-card__label">Malzemeler</h4>
        <p className={open ? "mb-2" : "clamp-2 mb-2"}>{recipe.ingredients}</p>

        {open && (
          <>
            <h4 className="recipe-card__label">Yapılışı</h4>
            <p className="mb-2">{recipe.instructions}</p>
          </>
        )}

        <button
          type="button"
          className="btn btn-link recipe-link p-0 text-start mb-3"
          onClick={() => setOpen(!open)}
        >
          {open ? "Daha az göster" : "Tarifi göster"}
        </button>

        <div className="mt-auto d-flex gap-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => onEdit(recipe)}
          >
            Düzenle
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(recipe.id)}
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
