import { createRecipeCard } from "./scripts/template/card.js";
import {listeIngredients} from "./scripts/template/ingredients.js";
import {listeAppareils} from "./scripts/template/appareils.js";
import {listeUstensils} from "./scripts/template/ustensils.js";


 async function getRecipes() {
  try {
    const response = await fetch('data/recipes.json'); 
    if (!response.ok) {
      throw new Error('La requête Fetch a échoué');
    }

    const recipesData = await response.json();
    
    return  recipesData;
      
  } catch (error) {
    console.error('Une erreur est survenue lors de la récupération des données :', error);
    return  [];

  }
    }

    getRecipes();

  async function displayRecipes() {
    const recipes =  await getRecipes()
    const recipeContainer = document.getElementById("section_card");

    recipes.forEach(recipe => {
      const recipeElement =  createRecipeCard(recipe)
      recipeContainer.appendChild(recipeElement);
    });
    
  }
  displayRecipes();
 

  function toggleContent() {
    const titleIngredients = document.getElementById('titleIngredient');
    const contentIngredient = document.getElementById('contentIngredient');

    const chevronUp = document.getElementById('chevron-upIngredients');
    const chevronDown = document.getElementById('chevron-downIngredients');

    function selectToggle(){
      if (contentIngredient.style.display === "block") {
        contentIngredient.removeAttribute('data-visible');
        contentIngredient.style.display = "none";
        chevronDown.style.display = 'block';
        chevronUp.style.display = 'none';
      } else {
        contentIngredient.setAttribute('data-visible', "true");
        contentIngredient.style.display = "block";
        chevronUp.style.display = 'block'
        chevronDown.style.display = 'none'
      }
    }

    titleIngredients.addEventListener('click', function() {
      selectToggle()
    });

      chevronUp.addEventListener('click', function() {
       selectToggle()
    });

     chevronDown.addEventListener('click', function() {
      selectToggle()
  });
}
  toggleContent();


  function toggleContentAppareils() {
    const titleAppareils = document.getElementById('titleAppareils');
    const toggleContentAppareils = document.getElementById('contentAppareils');

    const chevronUp = document.getElementById('chevron-upAppareils');
    const chevronDown = document.getElementById('chevron-downAppareils');

    function selectToggleAppareil(){
      if (toggleContentAppareils.style.display === "block") {
        toggleContentAppareils.style.display = "none";
        toggleContentAppareils.removeAttribute('data-visible');
        chevronDown.style.display = 'block';
        chevronUp.style.display = 'none';
      } else {
        toggleContentAppareils.style.display = "block";
        toggleContentAppareils.setAttribute('data-visible', "true")
        chevronUp.style.display = 'block'
        chevronDown.style.display = 'none'
      }
    }

    titleAppareils.addEventListener('click', function() {
      selectToggleAppareil()
    });

      chevronUp.addEventListener('click', function() {
        selectToggleAppareil()
    });

     chevronDown.addEventListener('click', function() {
      selectToggleAppareil()
  });
}
toggleContentAppareils();

function toggleContentUstensils() {
  const titleUstensil = document.getElementById('titleUstensil');
  const toggleContentUstensil = document.getElementById('contentUstensil');

  const chevronUp = document.getElementById('chevron-upUstensil');
  const chevronDown = document.getElementById('chevron-downUstensil');

  function selectToggleUstensil(){
    if (toggleContentUstensil.style.display === "block") {
      toggleContentUstensil.style.display = "none";
      toggleContentUstensil.removeAttribute('data-visible');
      chevronDown.style.display = 'block';
      chevronUp.style.display = 'none';
    } else {
      toggleContentUstensil.style.display = "block";
      toggleContentUstensil.setAttribute('data-visible', "true")
      chevronUp.style.display = 'block'
      chevronDown.style.display = 'none'
    }
  }

  // Ajouter un gestionnaire d'événements au clic
  titleUstensil.addEventListener('click', function() {
    selectToggleUstensil()
  });

    // Ajouter un gestionnaire d'événements au clic
    chevronUp.addEventListener('click', function() {
      selectToggleUstensil()
  });

   // Ajouter un gestionnaire d'événements au clic
   chevronDown.addEventListener('click', function() {
    selectToggleUstensil()
});
}
toggleContentUstensils();

async function displayIngredients() {
  const recipes = await getRecipes();

  const listeIngredientsContainer = document.getElementById("listeIngredients");
  const allIngredientsSet = new Set();

  recipes.forEach(recipe => {
    const ingredients = recipe.ingredients;

    // Ajouter chaque ingrédient individuellement à l'ensemble pour éviter les doublons
    ingredients.forEach(ingredient => {
      allIngredientsSet.add(ingredient.ingredient.toLowerCase()); 
    });
  });

  const allIngredientsListe = Array.from(allIngredientsSet);
  const ingredientsElement = listeIngredients(allIngredientsListe);
  listeIngredientsContainer.appendChild(ingredientsElement);
}

displayIngredients();

async function displayAppareils() {
  const recipes = await getRecipes();
  const listeAppareilsContainer = document.getElementById("listeAppareils");

  const allAppareilsSet = new Set();

  recipes.forEach(recipe => {
      const appareil = recipe.appliance;

      allAppareilsSet.add(appareil);
  });

  const allAppareilsListe = Array.from(allAppareilsSet);

  const appareilsElement = listeAppareils(allAppareilsListe);
  listeAppareilsContainer.appendChild(appareilsElement);
  console.log(allAppareilsListe)
}

displayAppareils();

async function displayUstensils() {
  const recipes = await getRecipes();
  const listeUstensilsContainer = document.getElementById("listeUstensils");

  const allUstensilsSet = new Set();

  recipes.forEach(recipe => {
      const ustensils = recipe.ustensils;
      
      ustensils.forEach(ustensile => {
          allUstensilsSet.add(ustensile.toLowerCase());
      });
  });

  const allUstensilsListe = Array.from(allUstensilsSet);

  const ustensilsElement = listeUstensils(allUstensilsListe);
  listeUstensilsContainer.appendChild(ustensilsElement);
        console.log(allUstensilsListe)

}

displayUstensils();
