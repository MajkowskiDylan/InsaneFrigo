const initialState = { savedRecipeIDs: [] }

function savedRecipes(state = initialState, action) {
	let nextState
	switch (action.type) {
	  case 'SAVE_RECIPE':
		nextState = {
		  ...state,
		  savedRecipeIDs: [...state.savedRecipeIDs, action.value]
		};
		return nextState || state
	  case 'UNSAVE_RECIPE':
		  nextState = {
			...state,
			savedRecipeIDs: state.savedRecipeIDs.filter(id => id !== action.value)
		  };
		return nextState || state
	  default:
		return state
	};
}

export default savedRecipes;