const STORAGE_KEY = 'recipe-book.recipes';

// Reads all recipes from LocalStorage (returns an empty array if there is nothing or the data is broken)
export function loadRecipes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Saves the whole recipe list to LocalStorage
export function saveRecipes(recipes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}