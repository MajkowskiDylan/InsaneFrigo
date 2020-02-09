const API_KEY = '226d462b515c4039a17e404e2b66ebe7' // API KEY Dylan
const API_KEY_BRUNO = '11c9a6db60ff45b3b9f38a00174fa4c1'; 

export async function getIngredients(offset, number, querry ) {
    try {
        const myHeaders = new Headers({ 'user-key': API_KEY  });
		const url = `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&offset=${offset||0}&number=${number||10}&${querry||""}`; 
 
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