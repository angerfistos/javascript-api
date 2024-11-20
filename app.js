/* -------------------------------- Appel API ------------------------------- */

const root = document.getElementById('result'); // Conteneur pour afficher les résultats
const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&origin=*&srsearch=';

// Fonction pour récupérer et afficher les résultats de l'API Wikipédia
const fetchWikipediaResults = async (searchTerm) => {
    try {
        const response = await fetch(url + encodeURIComponent(searchTerm));
        if (!response.ok) {
            throw new Error('Erreur lors de la requête API.');
        }

        const data = await response.json(); // Conversion de la réponse en JSON
        root.innerHTML = ''; // Réinitialisation du conteneur des résultats

        if (data.query.search.length === 0) {
            // Aucun résultat trouvé
            const noResults = document.createElement('p');
            noResults.textContent = 'Aucun résultat trouvé.';
            noResults.classList.add('text-red-500', 'text-center', 'font-bold', 'mt-4');
            root.appendChild(noResults);
        } else {
            // Affichage des résultats
            data.query.search.forEach((item) => {
                const title = item.title;
                const snippet = item.snippet;
                const articleUrl = `https://en.wikipedia.org/wiki/${title}`;

                // Création d'un bloc pour chaque résultat
                const blocResultat = document.createElement('div');
                const titleElement = document.createElement('h2');
                const snippetElement = document.createElement('p');
                const linkElement = document.createElement('a');

                // Ajout des contenus
                titleElement.textContent = title;
                snippetElement.innerHTML = snippet + '...'; // Maintient des balises retournées par l'API
                linkElement.textContent = 'Lire la suite';
                linkElement.href = articleUrl;
                linkElement.target = '_blank';

                // Ajout des classes Tailwind CSS
                blocResultat.classList.add('bg-white', 'shadow-lg', 'rounded-lg', 'p-4', 'mt-4');
                titleElement.classList.add('text-xl', 'font-bold', 'text-blue-700', 'mb-2');
                snippetElement.classList.add('text-gray-600', 'mb-4');
                linkElement.classList.add('text-blue-500', 'hover:underline');

                // Structure du bloc
                blocResultat.appendChild(titleElement); // Titre
                blocResultat.appendChild(snippetElement); // Extrait
                blocResultat.appendChild(linkElement); // Lien

                root.appendChild(blocResultat); // Ajout du bloc au conteneur
            });
        }
    } catch (error) {
        // Gestion des erreurs
        root.innerHTML = '<p class="text-red-500 text-center font-bold mt-4">Erreur lors de la requête API.</p>';
    }
};

// Gestionnaire d'événement pour le formulaire

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const searchTerm = form.search.value.trim(); // Récupère le terme de recherche

    if (!searchTerm) {
        root.innerHTML = '<p class="text-red-500 text-center font-bold mt-4">Veuillez entrer un terme de recherche.</p>';
        return;
    }

    fetchWikipediaResults(searchTerm); // Appelle la fonction de recherche
});

