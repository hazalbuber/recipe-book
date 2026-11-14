// Shape of a recipe object, plus the allowed categories.
// (JSDoc typedef is used here because the project is plain JavaScript.)

/**
 * @typedef {Object} Recipe
 * @property {number} id            Unique id (generated automatically)
 * @property {string} title         Recipe name
 * @property {string} category      One of CATEGORIES
 * @property {number} duration      Preparation time in minutes
 * @property {string} ingredients   Ingredients, written as free text
 * @property {string} instructions  Preparation steps
 * @property {boolean} favorite     Marked as favorite or not
 */

export const CATEGORIES = [
  "Kahvaltı",
  "Çorba",
  "Ana Yemek",
  "Hamur İşi",
  "Salata",
  "Meze",
  "Tatlı",
  "İçecek",
  "Atıştırmalık",
];

// Emoji shown on each recipe card, by category
export const CATEGORY_EMOJI = {
  Kahvaltı: "🍳",
  Çorba: "🍲",
  "Ana Yemek": "🍛",
  "Hamur İşi": "🥟",
  Salata: "🥗",
  Meze: "🧆",
  Tatlı: "🍰",
  İçecek: "🥤",
  Atıştırmalık: "🍿",
};

// An empty recipe, used to reset the form
export const EMPTY_RECIPE = {
  title: "",
  category: CATEGORIES[0],
  duration: "",
  ingredients: "",
  instructions: "",
  favorite: false,
};
