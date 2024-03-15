import { createRecipeCard } from "./scripts/template/card.js";
import { listeIngredients } from "./scripts/template/ingredients.js";
import { listeAppareils } from "./scripts/template/appareils.js";
import { listeUstensils } from "./scripts/template/ustensils.js";

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

getRecipes();

async function displayRecipes() {
  const recipes = await getRecipes();
  const recipeContainer = document.getElementById("section_card");

  recipes.forEach((recipe) => {
    const recipeElement = createRecipeCard(recipe);
    recipeContainer.appendChild(recipeElement);
  });
  // Mettre à jour le nombre de recettes affichées
  updateSearchCount(recipes.length);
}
displayRecipes();

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

  allIngredientsListe = Array.from(allIngredientsSet); // Initialiser allIngredientsListe

  const ingredientsElement = listeIngredients(allIngredientsListe);
  listeIngredientsContainer.appendChild(ingredientsElement);

  ingredientsSearchInput.addEventListener("input", function(event) {
    handleIngredientSearch(event, allIngredientsListe); // Utiliser allIngredientsListe comme argument
  });
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

  allAppareilsListe = Array.from(allAppareilsSet); // Initialiser allAppareilsListe

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

  allUstensilsListe = Array.from(allUstensilsSet); // Initialiser allUstensilsListe

  const ustensilsElement = listeUstensils(allUstensilsListe);
  listeUstensilsContainer.appendChild(ustensilsElement);
}

displayUstensils();

//SECTION RECHE SUR L INPUT CENTRAL //
const searchInput = document.querySelector(".search");
searchInput.addEventListener("input", async function (event) {
  // Récupérer la valeur saisie dans l'input de recherche
  const searchQuery = event.target.value.trim().toLowerCase();

  // Vérifier si la longueur de la requête de recherche est d'au moins 3 caractères
  if (searchQuery.length >= 3) {
    const recipes = await getRecipes();

    searchRecipes(searchQuery, recipes);
  } else {
    // Réafficher toutes les recettes disponibles
    displayRecipes();
  }
});

// Fonction pour rechercher parmi les recettes
async function searchRecipes(query, recipes) {
  const searchResults = recipes.filter((recipe) => {
    return (
      (recipe.name && recipe.name.toLowerCase().includes(query)) ||
      (recipe.description && recipe.description.toLowerCase().includes(query)) ||
      (recipe.ingredients && recipe.ingredients.some((ingredient) =>
        ingredient.ingredient && ingredient.ingredient.toLowerCase().includes(query)
      ))
    );
  });
  console.log(searchResults, "results");

  displaySearchResults(searchResults);
}

// Fonction pour afficher les résultats de la recherche
function displaySearchResults(results) {
  const recipeContainer = document.getElementById("section_card");

  // Nettoie le conteneur des recettes actuellement affichées
  recipeContainer.innerHTML = "";

  // Afficher uniquement les recettes qui correspondent aux résultats de la recherche
  results.forEach((recipe) => {
    const recipeElement = createRecipeCard(recipe);
    recipeContainer.appendChild(recipeElement);
  });
  // Mettre à jour le nombre de recettes affichées
  updateSearchCount(results.length);

  // Mettre à jour les listes d'ingrédients, d'appareils et d'ustensiles
  updateIngredientList(results);
  updateAppareilList(results);
  updateUstensilList(results);
}

// Fonction pour mettre à jour le nombre de recettes affichées
function updateSearchCount(count) {
  const countElement = document.querySelector(".nbRecettes");
  countElement.textContent = count + " recettes";
}

const listeIngredientsContainer = document.getElementById("listeIngredients");
const listeAppareilsContainer = document.getElementById("listeAppareils");
const listeUstensilsContainer = document.getElementById("listeUstensils");

// FILTRES //
// Fonction pour mettre à jour la liste DES INGREDIENTS affichée
function updateIngredientList(recipes) {
  const allIngredientsSet = new Set();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      allIngredientsSet.add(ingredient.ingredient.toLowerCase());
    });
  });
  const allIngredientsListe = Array.from(allIngredientsSet);

  const newList = listeIngredients(allIngredientsListe);
  console.log(allIngredientsListe, "allIngredient");

  listeIngredientsContainer.innerHTML = "";
  listeIngredientsContainer.appendChild(newList);
}

// Fonction pour mettre à jour la liste DES  USTENSILS affichée
function updateUstensilList(recipes) {
  const allUstensilsSet = new Set();
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      allUstensilsSet.add(ustensil.toLowerCase());
    });
  });
  const allUstensilsListe = Array.from(allUstensilsSet);
  console.log(allUstensilsListe, "ustensils");

  const newList = listeUstensils(allUstensilsListe);

  listeUstensilsContainer.innerHTML = "";
  listeUstensilsContainer.appendChild(newList);
}

// Fonction pour mettre à jour la liste DES APPAREILS affichée
function updateAppareilList(recipes) {
  const allAppareilsSet = new Set();
  recipes.forEach((recipe) => {
    allAppareilsSet.add(recipe.appliance.toLowerCase());
  });
  const allAppareilsListe = Array.from(allAppareilsSet);
  console.log(allAppareilsListe, "appareil");
  const newList = listeAppareils(allAppareilsListe);

  listeAppareilsContainer.innerHTML = "";
  listeAppareilsContainer.appendChild(newList);
}

// TAGS //

// Récupérer les éléments des champs de recherche par leur ID
const ingredientsSearchInput = document.getElementById("searchInputIngredients");
const appareilsSearchInput = document.getElementById("searchInputAppareils");
const ustensilsSearchInput = document.getElementById("searchInputUstensils");

// Ajouter des gestionnaires d'événements pour les champs de recherche
ingredientsSearchInput.addEventListener("input", async function(event) {
  const searchQuery = event.target.value.trim().toLowerCase();
  debugger
  await handleIngredientSearch(searchQuery);
});

appareilsSearchInput.addEventListener("input", async function(event) {
  const searchQuery = event.target.value.trim().toLowerCase();
  await handleAppareilSearch(searchQuery);
});

ustensilsSearchInput.addEventListener("input", async function(event) {
  const searchQuery = event.target.value.trim().toLowerCase();
  await handleUstensilSearch(searchQuery);
});

// Fonction pour gérer la recherche d'ingrédients
async function handleIngredientSearch(searchQuery) {
  if (searchQuery) { // Vérifier si searchQuery est défini
    filterAndDisplayResults(searchQuery, allIngredientsListe, "listeIngredients", listeIngredients);
  }
}

async function handleAppareilSearch(searchQuery) {
  if (searchQuery) { // Vérifier si searchQuery est défini
    // filterAndDisplayResults(searchQuery, allAppareilsListe, "listeAppareils", listeAppareils);
  }
}

async function handleUstensilSearch(searchQuery) {
  if (searchQuery) { // Vérifier si searchQuery est défini
    // filterAndDisplayResults(searchQuery, allUstensilsListe, "listeUstensils", listeUstensils);
  }
}

// Fonction pour filtrer et afficher les résultats
function filterAndDisplayResults(searchQuery, allItems, containerId, listFunction) {
  if (!allItems) {
    return;
  }
  debugger
  const filteredItems = allItems.filter(item => item.toLowerCase().includes(searchQuery));
  debugger
  updateFilteredResults(filteredItems, containerId, listFunction);
}

// Fonction pour mettre à jour les résultats filtrés dans le conteneur donné
function updateFilteredResults(filteredItems, containerId, listFunction) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  const newList = listeIngredients(filteredItems); // Utilisez la fonction de génération de liste fournie en argument
  container.appendChild(newList);

  // Mettez à jour les résultats de recherche principaux avec les filtres appliqués
  // const searchQuery = searchInput.value.trim().toLowerCase();
  // searchRecipes(searchQuery, filteredItems);
  // debugger
}