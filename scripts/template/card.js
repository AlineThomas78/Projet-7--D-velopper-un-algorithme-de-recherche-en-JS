
export function createRecipeCard(recipe) {

  const card = document.createElement('div');
  card.classList.add('card');

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container');
  card.appendChild(imgContainer);

  const img = document.createElement('img');
  img.classList.add('card-img');
  img.alt = recipe.name;
  img.src = `./assets/${recipe.image}`;
  imgContainer.appendChild(img);

  const preparationTime = document.createElement('div');
  preparationTime.classList.add('preparation-time');
  preparationTime.textContent = recipe.time + ' min'; 
  imgContainer.appendChild(preparationTime);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.appendChild(cardBody);

  const title = document.createElement('h5');
  title.classList.add('card-title');
  title.textContent = recipe.name;
  cardBody.appendChild(title);

  const description = document.createElement('div');
  description.classList.add('recette')
  cardBody.appendChild(description);

  const sousTitle = document.createElement('h6');
  sousTitle.classList.add('card-sousTitle');
  sousTitle.innerText = "recette" ;
  description.appendChild(sousTitle);

  const text = document.createElement('p');
  text.classList.add('card-text');
  text.textContent = recipe.description;
  description.appendChild(text);

  const cardIngredient = document.createElement('div');
  cardIngredient.classList.add('card-ingredient');
  card.appendChild(cardIngredient); 

  const titleIngredient = document.createElement('h6');
  titleIngredient.classList.add('card-sousTitle')
  titleIngredient.innerText = 'ingrédients';
  cardIngredient.appendChild(titleIngredient)

  const listGroup = document.createElement('ul');
  listGroup.classList.add('list');
  cardIngredient.appendChild(listGroup);
  
  recipe.ingredients.forEach(ingredient => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-li');

    const ingredientName = document.createElement('span');
    ingredientName.classList.add('title-ingredient');
    ingredientName.textContent = ingredient.ingredient;

    listItem.appendChild(ingredientName);

    // Si la quantité et l'unité sont définies, les afficher 
    if (ingredient.quantity !== undefined && ingredient.unit !== undefined) {
        const quantityUnitSpan = document.createElement('span');
        quantityUnitSpan.classList.add('quantity-unit');
        quantityUnitSpan.textContent = `${ingredient.quantity} ${ingredient.unit}`;
        listItem.appendChild(quantityUnitSpan);
    } else {
        // Si seulement la quantité est définie, l'afficher 
        if (ingredient.quantity !== undefined) {
            const quantitySpan = document.createElement('span');
            quantitySpan.classList.add('quantity-unit');
            quantitySpan.textContent = ingredient.quantity;
            listItem.appendChild(quantitySpan);
        }
        // Si seulement l'unité est définie, l'afficher 
        if (ingredient.unit !== undefined) {
            const unitSpan = document.createElement('span');
            unitSpan.classList.add('quantity-unit');
            unitSpan.textContent = ingredient.unit;
            listItem.appendChild(unitSpan);
        }
    }

    listGroup.appendChild(listItem);
});
  
  return card;
}