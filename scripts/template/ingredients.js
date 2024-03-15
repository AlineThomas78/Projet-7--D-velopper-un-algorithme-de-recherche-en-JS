export function listeIngredients(allIngredientsListe) {
    
        const IngredientsSet = new Set(allIngredientsListe);
    
        const ingredientsListe = Array.from(IngredientsSet);
    
        const ul = document.createElement('ul');
        ul.classList.add('containerList');
    
        ingredientsListe.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ul.appendChild(li);
        });
    debugger
        return ul;
    }