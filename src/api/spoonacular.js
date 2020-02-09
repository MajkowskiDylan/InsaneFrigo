const API_KEY = '226d462b515c4039a17e404e2b66ebe7' // API KEY Dylan

export async function getIngredients(searchTerm, startOffset) {
    try {
        const myHeaders = new Headers({ 'user-key': API_KEY  });
        const url = `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&query=cheese&number=2`;
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
    /* AVANT UN RETURN
    	_showIngredients = async () => {
		try {
		  console.log( await getIngredients() ); 
		} catch (error) {
		}
	  }
    */
    // DANS LA VUE
    // <Button title='Test API' onPress={ _showIngredients }/>
}