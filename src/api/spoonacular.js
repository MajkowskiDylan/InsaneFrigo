const API_KEY = '226d462b515c4039a17e404e2b66ebe7';

/**
 *
 * @export
 * @param {*} searchTerm
 * @param {*} diet
 * @param {*} cuisine
 * @returns
 */
export async function getRecipeWithSearch(searchTerm, diet, cuisine) {
	try {
		const myHeaders = new Headers({ 'apiKey': API_KEY });
		const url = `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&query=${searchTerm || ''}&diet=${diet || ''}&cuisine=${cuisine || ''}`;
		const response = await fetch(url, { headers: myHeaders });
		if (response.ok) {
			return response.json();
		}
		throw new Error(response.status);

	} catch (error) {
		console.log('Error with function getRecipeWithSearch ' + error.message);
		throw error;
	}
}

/**
 * 
 * @export
 */
export async function getRecipeDetails() {
    console.log('Chargement des données...')
    return null;
}

/**
 *
 * @export
 */
export async function getPossibleRecipe() {
	// Doit retourner des recettes selon les ingrédients enregistrés
}

/**
 * Renvoie la liste des aliments
 * @param {*} searchTerm 
 * @param {*} diet 
 * @param {*} cuisine 
 */
export async function getMyFridge(searchTerm, diet, cuisine) {
	try {
		const myHeaders = new Headers({ 'apiKey': API_KEY });
		const url = `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&query=${searchTerm || ''}&diet=${diet || ''}&cuisine=${cuisine || ''}`;
		const response = await fetch(url, { headers: myHeaders });
		if (response.ok) {
			return response.json();
		}
		throw new Error(response.status);

	} catch (error) {
		console.log('Error with function getMyFridge ' + error.message);
		throw error;
	}
}


export async function getIngredients() {
    try {
        const myHeaders = new Headers({ 'apikey': API_KEY  });
		//const url = `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&offset=${offset||0}&number=${number||10}&${query||""}`; 
        const url = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${API_KEY}&metaInformation=true&number=10&query=a`;
        console.log('url: ' + url);
        const response = await fetch(url, { headers: myHeaders });
		
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.status);
		
    } catch (error) {
        console.log('Error with function getIngredients ' + error.message);
        throw error;
    }
}