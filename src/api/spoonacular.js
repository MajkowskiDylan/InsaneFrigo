import {store} from '../store/config';

//const API_KEY = '226d462b515c4039a17e404e2b66ebe7';
//const API_KEY = '50ab304e889a43f0ba48ca3fe77277cd';
const API_KEY = '11c9a6db60ff45b3b9f38a00174fa4c1'; 
//const API_KEY = '5cab2b3fe5f34607b25b8170689532c1';

/**
 * Retourne les recettes de la recherche
 * @export
 * @param {*} searchTerm
 * @param {*} diet
 * @param {*} cuisine
 * @returns
 */
export async function getRecipeWithSearch(offset, searchTerm, diet, cuisine) {
	try {
		const myHeaders = new Headers({ 'apiKey': API_KEY });
		const url = `https://api.spoonacular.com/recipes/search?offset=${offset}&apiKey=${API_KEY}&query=${searchTerm || ''}&diet=${diet || ''}&cuisine=${cuisine || ''}`;
		const response = await Request({ headers: myHeaders, url:url });
		if (response.ok) {
			return response.json();
		}
		throw new Error(response.status);

	} catch (error) {
		console.log('[ ! ] Error with function getRecipeWithSearch ' + error.message);
		throw error;
	}
}

/**
 * Retourne les recettes possibles
 * @export
 * @param {*} ingredients
 * @returns
 */
export async function getPossibleRecipe(ingredients) {
	try {
		const myHeaders = new Headers({ 'apiKey': API_KEY });
		const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredients}&number=10`;
		const response = await Request({ headers: myHeaders, url:url });
		if (response.ok) {
			return response.json();
		}
		throw new Error(response.status);

	} catch (error) {
		console.log('[ ! ] Error with function getPossibleRecipe ' + error.message);
		throw error;
	}
}

/**
 * Retourne le détail d'une recette
 * @export
 */
export async function getRecipeDetails(recipeID) {
    try {
		const myHeaders = new Headers({ 'apiKey': API_KEY });
		const url = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${API_KEY}`;
		const response = await Request({ headers: myHeaders, url:url });
		if (response.ok) {
			return response.json();
		}
		throw new Error(response.status);

	} catch (error) {
		console.log('[ ! ] Error with function getRecipeDetails ' + error.message);
		throw error;
	}
}

/**
 * Retourne la liste des aliments
 * @param {*} searchTerm 
 * @param {*} diet 
 * @param {*} cuisine 
 */
export async function getMyFridge(searchTerm, diet, cuisine) {
	try {
		const myHeaders = new Headers({ 'apiKey': API_KEY });
		const url = `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&query=${searchTerm || ''}&diet=${diet || ''}&cuisine=${cuisine || ''}`;
		const response = await Request({ headers: myHeaders, url:url });
		if (response.ok) {
			return response.json();
		}
		throw new Error(response.status);

	} catch (error) {
		console.log('[ ! ] Error with function getMyFridge ' + error.message);
		throw error;
	}
}

/**
 * Retourne les ingrédients de la recherche
 * @export
 * @param {*} offset
 * @param {*} searchTerm
 * @param {*} number
 * @returns
 */
export async function getIngredients(searchTerm, number) {
    try {
        const myHeaders = new Headers({ 'apikey': API_KEY  });
		const url = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${API_KEY}&metaInformation=true&number=${number || '2'}&query=${searchTerm}`;
        console.log('url: ' + url);
        const response = await Request({ headers: myHeaders, url:url });
		
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.status);
		
    } catch (error) {
        console.log('[ ! ] Error with function getIngredients ' + error.message);
        throw error;
    }
}

export async function Request  ({url, headers}) {
    
    _updateQuota = async (nbr) => {
		if (nbr === undefined || nbr === null)
			console.log("no quota used");
		else{
			console.log(nbr);
			const action = { type: 'UPDATE', value: nbr };
			store.dispatch(action);
		}
    }
    const myHeaders = headers;
    
    console.log(url);
    try {
        const response = await fetch(url, { headers: myHeaders });
        if (response.ok) {
            _updateQuota(response.headers.get("X-API-Quota-Used"));
            return response;
        }
        throw new Error(response.status);
    
    } catch (error) {
        throw error;
    }
}