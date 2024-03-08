 export function listeUstensils(ustensils) {
    const ustensilesSet = new Set(ustensils);

    const ustensilesListe = Array.from(ustensilesSet);

    const ul = document.createElement('ul');
    ul.classList.add('containerList');

    ustensilesListe.forEach(ustensile => {
        const li = document.createElement('li');
        li.textContent = ustensile;
        ul.appendChild(li);
    });

    return ul;
}