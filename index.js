import { createRecipeCard } from "./scripts/template/card.js";
import { listeIngredients } from "./scripts/template/ingredients.js";
import { listeAppareils } from "./scripts/template/appareils.js";
import { listeUstensils } from "./scripts/template/ustensils.js";

let updatedRecipes = [];
let activeTags = [];

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
// debugger
  const recipesWithTags = activeTags.length ? recipes.filter(recipe => {
   console.log( activeTags.includes(recipe.appliance.toLowerCase()), "appliance")
   console.log(recipe.ustensils.some((ustensil) => activeTags.includes(ustensil.toLowerCase())), 'ustensil')
    return (
       activeTags.includes(recipe.appliance.toLowerCase()) ||
          recipe.ustensils.some((ustensil) => activeTags.includes(ustensil.toLowerCase())) ||
          recipe.ingredients.some((ingredient) => activeTags.includes(ingredient.ingredient.toLowerCase()))
      
    )
   }) : recipes
  //  debugger
console.log("recipeWithTags", recipesWithTags)
  const recipeContainer = document.getElementById("section_card");

  recipesWithTags.forEach((recipe) => {
    const recipeElement = createRecipeCard(recipe);
    recipeContainer.appendChild(recipeElement);
  });
  // Mettre à jour le nombre de recettes affichées
  updateSearchCount(recipesWithTags.length);
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
    // Réinitialiser les listes des filtres d'ingrédients, ustensiles et appareils
    displayIngredients();
    displayAppareils();
    displayUstensils();

    // Réafficher toutes les recettes disponibles
    displayRecipes();
  }
});

// Fonction pour rechercher parmi les recettes
async function searchRecipes(query) {
  const recipes = await getRecipes();

  const searchResults = recipes.filter((recipe) => {
    // console.log(activeTags.length, "activeTag");
    return ((recipe.name && recipe.name.toLowerCase().includes(query)) ||
      (recipe.description &&
        recipe.description.toLowerCase().includes(query)) ||
      (recipe.ingredients &&
        recipe.ingredients.some(
          (ingredient) =>
            ingredient.ingredient &&
            ingredient.ingredient.toLowerCase().includes(query)
        ))) 
  });
   const searchResultWithTags = searchResults.filter(result => {
   
    return (
      activeTags.length > 0
      ? activeTags.includes(result.appliance) ||
          result.ustensils.some((ustensil) => activeTags.includes(ustensil))
      : true
    )
   })
   console.log(searchResultWithTags );
  updatedRecipes = searchResultWithTags;
  displaySearchResults(searchResultWithTags);
}

// Fonction pour afficher les résultats de la recherche
function displaySearchResults(results) {
  const recipeContainer = document.getElementById("section_card");

  // Nettoie le conteneur des recettes actuellement affichées
  recipeContainer.innerHTML = "";

  if (results.length === 0) {
    // Afficher un message d'erreur personnalisé
    const searchInput = document.querySelector(".search");
    const searchQuery = searchInput.value.trim();

    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    
    const errorMessageText = document.createElement("p");
    errorMessageText.classList.add("errorMessageText");
    errorMessageText.innerHTML = `Aucune recette ne contient '<strong>${searchQuery}</strong>'. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
    
    recipeContainer.appendChild(errorMessage);
    errorMessage.appendChild(errorMessageText);
  } else {
    // Afficher uniquement les recettes qui correspondent aux résultats de la recherche
    results.forEach((recipe) => {
      const recipeElement = createRecipeCard(recipe);
      recipeContainer.appendChild(recipeElement);
    });
  }

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

let filteredIngredientList = [];

// FILTRES //
// Fonction pour mettre à jour la liste DES INGREDIENTS affichée
function updateIngredientList(recipes) {
  const allIngredientsSet = new Set();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientName = ingredient.ingredient.toLowerCase();
      // Ajouter l'ingrédient à l'ensemble uniquement s'il n'est pas déjà présent dans les activeTags
      if (!activeTags.includes(ingredientName)) {
        allIngredientsSet.add(ingredientName);
        // console.log(allIngredientsSet, "allingredientset")
        // console.log(activeTags, "activeTags")
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
  updateIngredientList(recipes);
  updateAppareilList(recipes);
  updateUstensilList(recipes);
}
init();

let filteredUstensilList = [];

// Fonction pour mettre à jour la liste DES  USTENSILS affichée
function updateUstensilList(recipes) {
  const allUstensilsSet = new Set();
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      const ustensilName = ustensil.toLowerCase();
      // Ajouter l'ustensile à l'ensemble uniquement s'il n'est pas déjà présent dans les activeTags
      if (!activeTags.includes(ustensilName)) {
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
function updateAppareilList(recipes) {
  const allAppareilsSet = new Set();
  recipes.forEach((recipe) => {
    const appareilName = recipe.appliance.toLowerCase();
    // Ajouter l'appareil à l'ensemble uniquement s'il n'est pas déjà présent dans les activeTags
    if (!activeTags.includes(appareilName)) {
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

  // Filtrer les ingrédients en fonction de la valeur de recherche
  const filteredAppareils = filteredAppareilList.filter((appliance) =>
    appliance.toLowerCase().includes(searchQuery)
  );

  // Mettre à jour l'affichage des ingrédients filtrés
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

  // Filtrer les ingrédients en fonction de la valeur de recherche
  const filteredUstensils = filteredUstensilList.filter((ustensils) =>
    ustensils.toLowerCase().includes(searchQuery)
  );

  // Mettre à jour l'affichage des ingrédients filtrés
  updateFilteredResults(filteredUstensils, "listeUstensils", listeUstensils);
}

function updateFilteredResults(filteredItems, containerId, listFunction) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  // Filtrer les éléments selon la présence dans les activeTags
  const filteredList = filteredItems.filter(
    (item) => !activeTags.includes(item)
  );

  // Utiliser la fonction listFunction pour générer la nouvelle liste
  const newList = listFunction(filteredList);

  // Ajouter la nouvelle liste au conteneur
  container.appendChild(newList);
}

// Fonction pour ajouter un tag
export function addTag(tagName) {
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

    // Réintégrer le tag dans la liste d'ingrédients filtrés
    filteredIngredientList.push(tagName);
    const newList = listeIngredients(filteredIngredientList);
    const listeIngredientsContainer =
      document.getElementById("listeIngredients");
    listeIngredientsContainer.innerHTML = "";
    listeIngredientsContainer.appendChild(newList);

    // Enlever le tag de activeTags
    const tagIndex = activeTags.indexOf(tagName);
    if (tagIndex !== -1) {
      activeTags.splice(tagIndex, 1);
    }

    // Mettre à jour les résultats de recherche en fonction de la nouvelle liste filtrée des ingrédients disponibles
    const searchInput = document.querySelector(".search");
    const searchQuery = searchInput.value.trim().toLowerCase();
    if (searchQuery.length >= 3) {
      searchRecipes(searchQuery);
    } else if (activeTags.length === 0) {
      // Si aucun tag actif après la suppression, réinitialisez la liste des recettes
      displayRecipes();
      displayIngredients(); // Afficher la liste des ingrédients
      displayAppareils(); // Afficher la liste des appareils
      displayUstensils(); // Afficher la liste des ustensiles
    }
  });

  // Ajouter le bouton de fermeture au tag
  tagElement.appendChild(closeButton);

  // Ajouter le tag au conteneur des tags
  tagContainer.appendChild(tagElement);

  // Ajouter le tag à activeTags
  activeTags.push(tagName.toLowerCase());

  // Filtrer la liste des ingrédients disponibles pour exclure le tag ajouté
  const ingredientIndex = filteredIngredientList.indexOf(tagName);
  if (ingredientIndex !== -1) {
    filteredIngredientList.splice(ingredientIndex, 1);
    const newList = listeIngredients(filteredIngredientList);
    const listeIngredientsContainer =
      document.getElementById("listeIngredients");
    listeIngredientsContainer.innerHTML = "";
    listeIngredientsContainer.appendChild(newList);
  }

  // Rechercher les recettes correspondant au tag ajouté
  searchRecipesByTag(tagName);
}

// Fonction pour rechercher parmi les recettes celles qui correspondent à un tag
async function searchRecipesByTag(tagName) {
  // const recipes =  await getRecipes(); // Obtenez les recettes disponibles
  const filteredRecipes = updatedRecipes.filter((recipe) => {
    // Vérifiez si le tag est présent dans les ingrédients, appareils ou ustensiles de chaque recette
    return (
      recipe.ingredients.some(
        (ingredient) =>
          ingredient.ingredient.toLowerCase() === tagName.toLowerCase()
      ) ||
      recipe.appliance.toLowerCase() === tagName.toLowerCase() ||
      recipe.ustensils.some(
        (ustensil) => ustensil.toLowerCase() === tagName.toLowerCase()
      )
    );
  });

  // Affichez les recettes correspondantes
  displaySearchResults(filteredRecipes);
}
