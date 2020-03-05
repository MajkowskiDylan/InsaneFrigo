const initialState = { savedRecipes: [] }

function savedRecipes(state = initialState, action) {
	let nextState
	switch (action.type) {
	  case 'SAVE_RECIPE':
		nextState = {
		  ...state,
		  savedRecipes: [...state.savedRecipes, action.value]
		};
		return nextState || state
	  case 'UNSAVE_RECIPE':
		  nextState = {
			...state,
			savedRecipes: state.savedRecipes.filter(recipe => recipe.id !== action.value.id)
		  };
		return nextState || state
        case 'RESET_RECIPE':
            nextState = {
                ...state,
                savedRecipes: []
                };
            return nextState || state		
	  default:
		return state
	};
}

export default savedRecipes;