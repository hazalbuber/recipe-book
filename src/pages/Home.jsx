import { useEffect, useState } from "react";
import RecipeForm from "../components/RecipeForm";
import RecipeFilters from "../components/RecipeFilters";
import RecipeList from "../components/RecipeList";
import { loadRecipes, saveRecipes } from "../storage";

function Home() {
  const [recipes, setRecipes] = useState(loadRecipes);
  const [editingRecipe, setEditingRecipe] = useState(null);

  // Filter state
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Save to LocalStorage every time the list changes
  useEffect(() => {
    saveRecipes(recipes);
  }, [recipes]);

  // CREATE
  const addRecipe = (data) => {
    const newRecipe = { ...data, id: Date.now() };
    setRecipes((prev) => [newRecipe, ...prev]);
  };

  // UPDATE
  const updateRecipe = (data) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === editingRecipe.id ? { ...data, id: r.id } : r)),
    );
    setEditingRecipe(null);
  };

  // DELETE
  const deleteRecipe = (id) => {
    if (!window.confirm("Bu tarifi silmek istediğine emin misin?")) return;
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    if (editingRecipe && editingRecipe.id === id) setEditingRecipe(null);
  };

  const toggleFavorite = (id) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r)),
    );
  };

  const startEdit = (recipe) => {
    setEditingRecipe(recipe);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // READ (with filters): search in title and ingredients, then category, then favorites
  const query = search.trim().toLocaleLowerCase("tr");
  const visibleRecipes = recipes.filter((r) => {
    const matchesSearch =
      !query ||
      r.title.toLocaleLowerCase("tr").includes(query) ||
      r.ingredients.toLocaleLowerCase("tr").includes(query);
    const matchesCategory = !categoryFilter || r.category === categoryFilter;
    const matchesFavorite = !onlyFavorites || r.favorite;
    return matchesSearch && matchesCategory && matchesFavorite;
  });

  const emptyMessage =
    recipes.length === 0
      ? "Henüz tarif yok. Yukarıdaki formdan ilk tarifini ekle."
      : "Bu filtrelere uyan tarif bulunamadı.";

  return (
    <>
      <header className="hero">
        <div className="container">
          <h1>🍳 Tarif Defterim</h1>
          <p className="mb-0">
            Sevdiğin tarifleri ekle, düzenle ve her zaman elinin altında tut.
          </p>
        </div>
      </header>

      <main className="container py-4">
        {/* "key" makes React build a fresh form whenever we switch between add and edit */}
        <RecipeForm
          key={editingRecipe ? editingRecipe.id : "new"}
          initialRecipe={editingRecipe ?? undefined}
          onSubmit={editingRecipe ? updateRecipe : addRecipe}
          onCancel={() => setEditingRecipe(null)}
        />

        <h2 className="h4 mb-3">
          Tarifler{" "}
          <span className="text-muted fs-6">
            ({visibleRecipes.length} / {recipes.length})
          </span>
        </h2>

        <RecipeFilters
          search={search}
          onSearchChange={setSearch}
          category={categoryFilter}
          onCategoryChange={setCategoryFilter}
          onlyFavorites={onlyFavorites}
          onOnlyFavoritesChange={setOnlyFavorites}
        />

        <RecipeList
          recipes={visibleRecipes}
          emptyMessage={emptyMessage}
          onToggleFavorite={toggleFavorite}
          onEdit={startEdit}
          onDelete={deleteRecipe}
        />
      </main>

      <footer className="text-center text-muted small py-4">
        Tarif Defterim · React + Bootstrap 5
      </footer>
    </>
  );
}

export default Home;
