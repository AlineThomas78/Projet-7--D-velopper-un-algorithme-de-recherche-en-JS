export function listeAppareils(appareils) {
    // Créer un ensemble pour stocker les appareils sans doublons
    const appareilsSet = new Set(appareils);

    // Convertir l'ensemble en un tableau
    const appareilsListe = Array.from(appareilsSet);

    // Créer une liste HTML pour afficher les appareils
    const ul = document.createElement('ul');
    ul.classList.add('containerList');

    // Ajouter chaque appareil à la liste HTML
    appareilsListe.forEach(appareil => {
        const li = document.createElement('li');
        li.textContent = appareil;
        ul.appendChild(li);
    });

    return ul;
}