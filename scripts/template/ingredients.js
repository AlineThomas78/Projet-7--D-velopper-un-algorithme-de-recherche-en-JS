import { addTag } from '../../index.js';

export function listeIngredients(filteredIngredientsList) {
  const ul = document.createElement('ul');
  ul.classList.add('containerList');

  filteredIngredientsList.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    li.classList.add('resultItem'); 

    // Ajouter un gestionnaire d'événements au clic sur chaque ingrédient
    li.addEventListener('click', function() {
      addTag(ingredient); 
    });

    ul.appendChild(li);
  });

  return ul;
}