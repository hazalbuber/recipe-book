import { useState } from "react";
import { CATEGORIES, EMPTY_RECIPE } from "../interfaces/recipe";

// One form for both adding and editing.
// - initialRecipe: the recipe being edited (undefined when adding a new one)
// - onSubmit: called with the form data
// - onCancel: called when the user cancels editing
function RecipeForm({ initialRecipe, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialRecipe ?? EMPTY_RECIPE);
  const isEditing = Boolean(initialRecipe);

  // Updates the field that was changed (the input's "name" must match the key in the form object)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the browser from reloading the page
    if (!form.title.trim()) return;

    onSubmit({
      ...form,
      title: form.title.trim(),
      duration: Number(form.duration) || 0,
    });

    // Clear the form after adding (when editing, the parent closes the form)
    if (!isEditing) setForm(EMPTY_RECIPE);
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body mb-4">
      <h2 className="h5 mb-3">
        {isEditing ? "Tarifi Düzenle" : "Yeni Tarif Ekle"}
      </h2>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label" htmlFor="title">
            Tarif Adı
          </label>
          <input
            id="title"
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label" htmlFor="category">
            Kategori
          </label>
          <select
            id="category"
            name="category"
            className="form-select"
            value={form.category}
            onChange={handleChange}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label" htmlFor="duration">
            Süre (dk)
          </label>
          <input
            id="duration"
            name="duration"
            type="number"
            min="0"
            className="form-control"
            value={form.duration}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label" htmlFor="ingredients">
            Malzemeler
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows="2"
            className="form-control"
            value={form.ingredients}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label" htmlFor="instructions">
            Yapılışı
          </label>
          <textarea
            id="instructions"
            name="instructions"
            rows="3"
            className="form-control"
            value={form.instructions}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-3 d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Güncelle" : "Ekle"}
        </button>
        {isEditing && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancel}
          >
            Vazgeç
          </button>
        )}
      </div>
    </form>
  );
}

export default RecipeForm;
