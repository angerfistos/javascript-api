const form = document.querySelector('form');
const result = document.querySelector('#result');
const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&origin=*&srsearch=';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const search = form.search.value.trim(); // On enlève les espaces inutiles
    if (!search) {
        result.innerHTML = 'Veuillez entrer un terme de recherche.';
        return;
    }

    try {
        const response = await fetch(url + encodeURIComponent(search));
        if (!response.ok) {
            throw new Error('Erreur lors de la requête API.');
        }
        const data = await response.json();
        console.log(data);

        if (data.query.search.length === 0) {
            result.innerHTML = 'Aucun résultat trouvé.';
        } else {
            result.innerHTML = '';
            data.query.search.forEach((item) => {
                const title = item.title;
                const snippet = item.snippet;
                const url = `https://en.wikipedia.org/wiki/${title}`;
                result.innerHTML += `
                    <div class="flex flex-col gap-4">
                        <h3 class="my-4 text-blue-700 hover:underline hover:underline-offeset-4">Lien: <a href="${url}" target="_blank">${title}</a></h3>
                        <hr>
                        <p>${snippet}</p>
                    </div>
                `;
            });
        }
    } catch (error) {
        result.innerHTML = 'Erreur lors de la requête API.';
    }
}   );
