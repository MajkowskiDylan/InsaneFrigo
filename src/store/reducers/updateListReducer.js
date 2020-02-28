const initialState = { tbIngredients: [] }

function updateIngredients(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SAVE_INGREDIENT':
      nextState = {
        ...state,
        tbIngredients: [...state.tbIngredients, action.value]
      };
      return nextState || state
    case 'UNSAVE_INGREDIENT':
        nextState = {
          ...state,
          tbIngredients: state.tbIngredients.filter(name => name !== action.value)
        };
      return nextState || state
    default:
      return state
  };
}

export default updateIngredients;
