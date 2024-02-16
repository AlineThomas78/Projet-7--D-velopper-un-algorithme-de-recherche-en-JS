import { createRecipeCard } from "./scripts/template/card.js";


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


  