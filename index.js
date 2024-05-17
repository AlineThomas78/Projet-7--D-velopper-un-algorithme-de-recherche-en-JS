import { createRecipeCard } from "./scripts/template/card.js";
import { listeIngredients } from "./scripts/template/ingredients.js";
import { listeAppareils } from "./scripts/template/appareils.js";
import { listeUstensils } from "./scripts/template/ustensils.js";

let updatedRecipes = [];

let activeFilters = {
  searchTerm: "",
  ingredients: [],
  appliances: [],
  ustensils: [],
};

async function getRecipes() {
  try {
    const response = await fetch("data/recipes.json");
    if (!response.ok) {
      throw new Error("La requête Fetch a échoué");
    }

    const recipesData = await response.json();

    return recipesData;
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la récupération des données :",
      error
    );
    return [];
  }
}

async function displayRecipes() {
  const recipeContainer = document.getElementById("section_card");
  recipeContainer.innerHTML = "";

  updatedRecipes.forEach((recipe) => {
    const recipeElement = createRecipeCard(recipe);
    recipeContainer.appendChild(recipeElement);
  });
  // Mettre à jour le nombre de recettes affichées
  updateSearchCount(updatedRecipes.length);
}

function toggleContent() {
  const titleIngredients = document.getElementById("titleIngredient");
  const contentIngredient = document.getElementById("contentIngredient");

  const chevronUp = document.getElementById("chevron-upIngredients");
  const chevronDown = document.getElementById("chevron-downIngredients");

  function selectToggle() {
    if (contentIngredient.style.display === "block") {
      contentIngredient.removeAttribute("data-visible");
      contentIngredient.style.display = "none";
      chevronDown.style.display = "block";
      chevronUp.style.display = "none";
    } else {
      contentIngredient.setAttribute("data-visible", "true");
      contentIngredient.style.display = "block";
      chevronUp.style.display = "block";
      chevronDown.style.display = "none";
    }
  }

  titleIngredients.addEventListener("click", function () {
    selectToggle();
  });

  chevronUp.addEventListener("click", function () {
    selectToggle();
  });

  chevronDown.addEventListener("click", function () {
    selectToggle();
  });
}
toggleContent();

function toggleContentAppareils() {
  const titleAppareils = document.getElementById("titleAppareils");
  const toggleContentAppareils = document.getElementById("contentAppareils");

  const chevronUp = document.getElementById("chevron-upAppareils");
  const chevronDown = document.getElementById("chevron-downAppareils");

  function selectToggleAppareil() {
    if (toggleContentAppareils.style.display === "block") {
      toggleContentAppareils.style.display = "none";
      toggleContentAppareils.removeAttribute("data-visible");
      chevronDown.style.display = "block";
      chevronUp.style.display = "none";
    } else {
      toggleContentAppareils.style.display = "block";
      toggleContentAppareils.setAttribute("data-visible", "true");
      chevronUp.style.display = "block";
      chevronDown.style.display = "none";
    }
  }

  titleAppareils.addEventListener("click", function () {
    selectToggleAppareil();
  });

  chevronUp.addEventListener("click", function () {
    selectToggleAppareil();
  });

  chevronDown.addEventListener("click", function () {
    selectToggleAppareil();
  });
}
toggleContentAppareils();

function toggleContentUstensils() {
  const titleUstensil = document.getElementById("titleUstensil");
  const toggleContentUstensil = document.getElementById("contentUstensil");

  const chevronUp = document.getElementById("chevron-upUstensil");
  const chevronDown = document.getElementById("chevron-downUstensil");

  function selectToggleUstensil() {
    if (toggleContentUstensil.style.display === "block") {
      toggleContentUstensil.style.display = "none";
      toggleContentUstensil.removeAttribute("data-visible");
      chevronDown.style.display = "block";
      chevronUp.style.display = "none";
    } else {
      toggleContentUstensil.style.display = "block";
      toggleContentUstensil.setAttribute("data-visible", "true");
      chevronUp.style.display = "block";
      chevronDown.style.display = "none";
    }
  }

  // Ajouter un gestionnaire d'événements au clic
  titleUstensil.addEventListener("click", function () {
    selectToggleUstensil();
  });

  // Ajouter un gestionnaire d'événements au clic
  chevronUp.addEventListener("click", function () {
    selectToggleUstensil();
  });

  // Ajouter un gestionnaire d'événements au clic
  chevronDown.addEventListener("click", function () {
    selectToggleUstensil();
  });
}
toggleContentUstensils();

let allIngredientsListe;

async function displayIngredients() {
  const recipes = await getRecipes();

  const listeIngredientsContainer = document.getElementById("listeIngredients");
  const allIngredientsSet = new Set();

  recipes.forEach((recipe) => {
    const ingredients = recipe.ingredients;

    ingredients.forEach((ingredient) => {
      allIngredientsSet.add(ingredient.ingredient.toLowerCase());
    });
  });

  allIngredientsListe = Array.from(allIngredientsSet);

  const ingredientsElement = listeIngredients(allIngredientsListe);
  listeIngredientsContainer.appendChild(ingredientsElement);
}

displayIngredients();

let allAppareilsListe;

async function displayAppareils() {
  const recipes = await getRecipes();
  const listeAppareilsContainer = document.getElementById("listeAppareils");

  const allAppareilsSet = new Set();

  recipes.forEach((recipe) => {
    const appareil = recipe.appliance;

    allAppareilsSet.add(appareil);
  });

  allAppareilsListe = Array.from(allAppareilsSet); 
  const appareilsElement = listeAppareils(allAppareilsListe);
  listeAppareilsContainer.appendChild(appareilsElement);
}

displayAppareils();

let allUstensilsListe;

async function displayUstensils() {
  const recipes = await getRecipes();
  const listeUstensilsContainer = document.getElementById("listeUstensils");

  const allUstensilsSet = new Set();

  recipes.forEach((recipe) => {
    const ustensils = recipe.ustensils;

    ustensils.forEach((ustensile) => {
      allUstensilsSet.add(ustensile.toLowerCase());
    });
  });

  allUstensilsListe = Array.from(allUstensilsSet); 

  const ustensilsElement = listeUstensils(allUstensilsListe);
  listeUstensilsContainer.appendChild(ustensilsElement);
}

displayUstensils();

//SECTION RECHE SUR L INPUT CENTRAL //
const searchInput = document.querySelector(".search");
searchInput.addEventListener("input", async function (event) {
  // Récupére la valeur saisie dans l'input de recherche
  const searchQuery = event.target.value.trim().toLowerCase();
  globalSearch({
    ...activeFilters,
    searchTerm: searchQuery,
  });
});

// Fonction pour mettre à jour le nombre de recettes affichées
function updateSearchCount(count) {
  const countElement = document.querySelector(".nbRecettes");
  countElement.textContent = count + " recettes";
}

const listeIngredientsContainer = document.getElementById("listeIngredients");
const listeAppareilsContainer = document.getElementById("listeAppareils");
const listeUstensilsContainer = document.getElementById("listeUstensils");

let filteredIngredientList = [];

// FILTRES //
// Fonction pour mettre à jour la liste DES INGREDIENTS affichée
function updateIngredientList() {
  const allIngredientsSet = new Set();
  updatedRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientName = ingredient.ingredient.toLowerCase();
      // Ajouter l'ingrédient à l'ensemble uniquement s'il n'est pas déjà présent dans les activeFilters
      if (!activeFilters.ingredients.includes(ingredientName)) {
        allIngredientsSet.add(ingredientName);
      }
    });
  });
  const allIngredientsListe = Array.from(allIngredientsSet);

  // Assigner la liste filtrée à la variable
  filteredIngredientList = allIngredientsListe;

  const newList = listeIngredients(allIngredientsListe);
  listeIngredientsContainer.innerHTML = "";
  listeIngredientsContainer.appendChild(newList);
}

async function init() {
  const recipes = await getRecipes();
  updatedRecipes = recipes;
  updateFiltersContent();
  displayRecipes();
}
init();

let filteredUstensilList = [];

// Fonction pour mettre à jour la liste DES  USTENSILS affichée
function updateUstensilList() {
  const allUstensilsSet = new Set();
  updatedRecipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      const ustensilName = ustensil.toLowerCase();
      // Ajouter l'ustensile à l'ensemble uniquement s'il n'est pas déjà présent dans les activeFilters
      if (!activeFilters.ustensils.includes(ustensilName)) {
        allUstensilsSet.add(ustensilName);
      }
    });
  });
  const allUstensilsListe = Array.from(allUstensilsSet);

  // Assigner la liste filtrée à la variable
  filteredUstensilList = allUstensilsListe;

  const newList = listeUstensils(allUstensilsListe);

  listeUstensilsContainer.innerHTML = "";
  listeUstensilsContainer.appendChild(newList);
}

let filteredAppareilList = [];
// Fonction pour mettre à jour la liste DES APPAREILS affichée
function updateAppareilList() {
  const allAppareilsSet = new Set();
  updatedRecipes.forEach((recipe) => {
    const appareilName = recipe.appliance.toLowerCase();
    // Ajouter l'appareil à l'ensemble uniquement s'il n'est pas déjà présent dans les activeFilters
    if (!activeFilters.appliances.includes(appareilName)) {
      allAppareilsSet.add(appareilName);
    }
  });
  const allAppareilsListe = Array.from(allAppareilsSet);

  // Assigner la liste filtrée à la variable
  filteredAppareilList = allAppareilsListe;

  const newList = listeAppareils(allAppareilsListe);

  listeAppareilsContainer.innerHTML = "";
  listeAppareilsContainer.appendChild(newList);
}

// TAGS //

// Récupérer les éléments des champs de recherche par leur ID
const ingredientsSearchInput = document.getElementById(
  "searchInputIngredients"
);
const appareilsSearchInput = document.getElementById("searchInputAppareils");
const ustensilsSearchInput = document.getElementById("searchInputUstensils");

// Ajouter des gestionnaires d'événements pour les champs de recherche
ingredientsSearchInput.addEventListener("input", async function (event) {
  await handleIngredientSearch(event, filteredIngredientList);
});

appareilsSearchInput.addEventListener("input", async function (event) {
  await handleAppareilSearch(event, filteredAppareilList);
});

ustensilsSearchInput.addEventListener("input", async function (event) {
  await handleUstensilSearch(event, filteredUstensilList);
});

// Fonction pour gérer la recherche d'ingrédients
async function handleIngredientSearch(event) {
  const searchQuery = event.target.value.trim().toLowerCase();

  // Vérifier si la valeur de recherche est vide
  if (searchQuery === "") {
    const filteredIngredients = filteredIngredientList;
    updateFilteredResults(
      filteredIngredients,
      "listeIngredients",
      listeIngredients
    );
    return;
  }
  // Filtrer les ingrédients en fonction de la valeur de recherche
  const filteredIngredients = filteredIngredientList.filter((ingredient) =>
    ingredient.toLowerCase().includes(searchQuery)
  );

  // Mettre à jour l'affichage des ingrédients filtrés
  updateFilteredResults(
    filteredIngredients,
    "listeIngredients",
    listeIngredients
  );
}

// Fonction pour gérer la recherche d'appareils
async function handleAppareilSearch(event) {
  const searchQuery = event.target.value.trim().toLowerCase();

  // Vérifier si la valeur de recherche est vide
  if (searchQuery === "") {
    const filteredAppareils = filteredAppareilList;
    updateFilteredResults(filteredAppareils, "listeAppareils", listeAppareils);
    return;
  }

  // Filtrer les appareils en fonction de la valeur de recherche
  const filteredAppareils = filteredAppareilList.filter((appliance) =>
    appliance.toLowerCase().includes(searchQuery)
  );

  // Mettre à jour l'affichage des appareils filtrés
  updateFilteredResults(filteredAppareils, "listeAppareils", listeAppareils);
}

async function handleUstensilSearch(event) {
  const searchQuery = event.target.value.trim().toLowerCase();

  // Vérifier si la valeur de recherche est vide
  if (searchQuery === "") {
    const filteredUstensils = filteredUstensilList;
    updateFilteredResults(filteredUstensils, "listeUstensils", listeUstensils);
    return;
  }

  // Filtrer les ustensils en fonction de la valeur de recherche
  const filteredUstensils = filteredUstensilList.filter((ustensils) =>
    ustensils.toLowerCase().includes(searchQuery)
  );

  // Mettre à jour l'affichage des ustensils filtrés
  updateFilteredResults(filteredUstensils, "listeUstensils", listeUstensils);
}

function updateFilteredResults(filteredItems, containerId, listFunction) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const currentActiveFilters =
    containerId === "listeIngredients"
      ? activeFilters.ingredients
      : containerId === "listeUstensils"
      ? activeFilters.ustensils
      : activeFilters.appliances;
  // Filtrer les éléments selon la présence dans les activeTags
  const filteredList = filteredItems.filter(
    (item) => !currentActiveFilters.includes(item)
  );

  // Utiliser la fonction listFunction pour générer la nouvelle liste
  const newList = listFunction(filteredList);
  container.appendChild(newList);
}

// Fonction pour ajouter un tag
export function addTag(tagName, tagType) {
  const tagContainer = document.getElementById("tagsContainer");

  // Créer un élément de tag
  const tagElement = document.createElement("div");
  tagElement.classList.add("tag");
  tagElement.textContent = tagName;

  // Ajouter un bouton pour supprimer le tag
  const closeButton = document.createElement("button");
  closeButton.classList.add("closeButton");
  closeButton.textContent = "X";
  closeButton.addEventListener("click", function () {
    tagElement.remove();
    activeFilters = {
      ...activeFilters,
      // copier tous les filtres du tagType sauf celui que l'on veut enlever
      [tagType]: activeFilters[tagType].filter(
        (filter) => filter !== tagName.toLowerCase()
      ),
    };
    globalSearch(activeFilters);
  });

  // Ajouter le bouton de fermeture au tag
  tagElement.appendChild(closeButton);

  // Ajouter le tag au conteneur des tags
  tagContainer.appendChild(tagElement);

  activeFilters[tagType].push(tagName.toLowerCase());
  globalSearch(activeFilters);
}

/**
 * Performs a global search using the provided search term and filters.
 * @param {Object} filters - An object containing search term and filters.
 * @param {string} filters.searchTerm - The search term to be used.
 * @param {Array<string>} filters.ingredients - The ingredients filters to be applied.
 * @param {Array<string>} filters.appliances - The appliance filters to be applied.
 * @param {Array<string>} filters.ustensils - The ustensils filters to be applied.
 * @returns {Array} - A promise that resolves to an array of search results.
 */

async function globalSearch(filters) {
  activeFilters = { ...filters };
  const allRecipes = await getRecipes();
  const recipesResult = allRecipes.filter((recipe) => {
    return (
      (filters.searchTerm && filters.searchTerm.length >= 3
        ? recipe.name.toLowerCase().includes(filters.searchTerm) ||
          recipe.description.toLowerCase().includes(filters.searchTerm)
        : true) &&
      (filters.ingredients && filters.ingredients.length > 0
        ? recipe.ingredients.some((_ingredient) =>
            filters.ingredients.includes(_ingredient.ingredient.toLowerCase())
          )
        : true) &&
      (filters.appliances && filters.appliances.length > 0
        ? filters.appliances.includes(recipe.appliance.toLowerCase())
        : true) &&
      (filters.ustensils && filters.ustensils.length > 0
        ? recipe.ustensils.some((_ustensil) =>
            filters.ustensils.includes(_ustensil.toLowerCase())
          )
        : true)
    );
  });
  updatedRecipes = recipesResult;
  displayRecipes();
  updateFiltersContent();

  // Vérifier si la recherche a au moins 3 caractères et aucune correspondance n'a été trouvée
  if (filters.searchTerm && filters.searchTerm.length >= 3 && recipesResult.length === 0) {
    displayErrorMessage(filters.searchTerm);
  } else {
    // Si la recherche est vide ou ne remplit pas les conditions, masquer le message d'erreur
    hideErrorMessage();
  }

  return recipesResult;
}

function displayErrorMessage(searchTerm) {
  const errorContainer = document.getElementById("errorContainer");
  const errorMessageElement = document.createElement("p");
  errorMessageElement.classList.add('errorP');

  // Créer le contenu du message avec un span pour le terme de recherche
  const message = document.createElement("span");
  message.textContent = `Aucune recette ne contient `;
  
  const searchTermSpan = document.createElement("span");
  searchTermSpan.classList.add('searchTermClass'); 
  searchTermSpan.textContent = `‘${searchTerm}’`;

  const messageEnd = document.createElement("span");
  messageEnd.textContent = `. vous pouvez chercher « tarte aux pommes », « poisson », etc.`;

  // Assembler les parties du message
  errorMessageElement.appendChild(message);
  errorMessageElement.appendChild(searchTermSpan);
  errorMessageElement.appendChild(messageEnd);

  errorContainer.innerHTML = ""; 
  errorContainer.appendChild(errorMessageElement);
  errorContainer.style.display = "block";
}

// Fonction pour masquer le message d'erreur
function hideErrorMessage() {
  const errorContainer = document.getElementById("errorContainer");
  errorContainer.style.display = "none";
}

function updateFiltersContent() {
  updateAppareilList();
  updateIngredientList();
  updateUstensilList();
}
