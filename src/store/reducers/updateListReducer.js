const initialState = { FridgeIngredients: [], ShoppingIngredients:[] }

function updateIngredients(state = initialState, action) {
  let nextState
  console.log("action "+ action.type);
  switch (action.type) {
    case 'SAVE_FRIDGE_INGREDIENT':
      console.log(state.FridgeIngredients); 
      nextState = {
        ...state,
        FridgeIngredients: [...state.FridgeIngredients, action.value]
      };
      console.log(nextState.FridgeIngredients); 
      return nextState || state
    case 'UNSAVE_FRIDGE_INGREDIENT':
      nextState = {
          ...state,
          FridgeIngredients: state.FridgeIngredients.filter(name => name !== action.value)
        };
      return nextState || state
    case 'SAVE_SHOPPING_INGREDIENT':
      nextState = {
        ...state,
        ShoppingIngredients: [...state.ShoppingIngredients, action.value]
      };
      return nextState || state
    case 'UNSAVE_SHOPPING_INGREDIENT':
      nextState = {
          ...state,
          ShoppingIngredients: state.ShoppingIngredients.filter(name => name !== action.value)
        };
      return nextState || state
    default:
      return state
  };
}

export default updateIngredients;
