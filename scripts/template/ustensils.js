import { addTag } from "../../index.js";

export function listeUstensils(ustensils) {
  const ustensilesSet = new Set(ustensils);

  const ustensilesListe = Array.from(ustensilesSet);

  const ul = document.createElement("ul");
  ul.classList.add("containerList");

  ustensilesListe.forEach((ustensile) => {
    const li = document.createElement("li");
    li.textContent = ustensile;
    li.classList.add("resultItem");

    // Ajouter un gestionnaire d'événements au clic sur chaque ingrédient
    li.addEventListener("click", function () {
      addTag(ustensile, "ustensils"); // Ajouter l'ingrédient comme tag
    });
    ul.appendChild(li);
  });

  return ul;
}