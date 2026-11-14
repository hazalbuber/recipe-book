import RecipeCard from "./RecipeCard";

// Renders all recipes as a responsive grid of cards.
function RecipeList({
  recipes,
  emptyMessage,
  onToggleFavorite,
  onEdit,
  onDelete,
}) {
  if (recipes.length === 0) {
    return <p className="text-muted">{emptyMessage}</p>;
  }

  return (
    <div className="row g-4">
      {recipes.map((recipe) => (
        <div className="col-12 col-md-6 col-lg-4" key={recipe.id}>
          <RecipeCard
            recipe={recipe}
            onToggleFavorite={onToggleFavorite}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
