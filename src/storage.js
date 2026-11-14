import { SAMPLE_RECIPES } from "./data/sampleRecipes";

const STORAGE_KEY = "recipe-book.recipes";

// Reads recipes from LocalStorage.
// First visit (nothing stored yet): returns the sample recipes.
// If the user deleted everything, an empty list is stored, so the samples do not come back.
export function loadRecipes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw === null ? SAMPLE_RECIPES : JSON.parse(raw);
  } catch {
    return [];
  }
}

// Saves the whole recipe list to LocalStorage
export function saveRecipes(recipes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}
