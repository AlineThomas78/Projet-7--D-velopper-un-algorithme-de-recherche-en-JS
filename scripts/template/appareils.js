import { addTag } from "../../index.js";

export function listeAppareils(appareils) {
  // Créer un ensemble pour stocker les appareils sans doublons
  const appareilsSet = new Set(appareils);

  // Convertir l'ensemble en un tableau
  const appareilsListe = Array.from(appareilsSet);

  // Créer une liste HTML pour afficher les appareils
  const ul = document.createElement("ul");
  ul.classList.add("containerList");

  // Ajouter chaque appareil à la liste HTML
  appareilsListe.forEach((appareil) => {
    const li = document.createElement("li");
    li.textContent = appareil;
    li.classList.add("resultItem");

    // Ajouter un gestionnaire d'événements au clic sur chaque ingrédient
    li.addEventListener("click", function () {
      addTag(appareil, "appliances"); // Ajouter l'ingrédient comme tag
    });
    ul.appendChild(li);
  });

  return ul;
}