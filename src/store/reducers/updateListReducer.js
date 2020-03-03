const initialState = { FridgeIngredients: [], ShoppingIngredients:[] }

function updateIngredients(state = initialState, action) {
  let nextState
    console.log(action.type);
    switch (action.type) {
    case 'SAVE_FRIDGE_INGREDIENT':
      nextState = {
        ...state,
        FridgeIngredients: [...state.FridgeIngredients, action.value]
      };
      return nextState || state
    case 'UNSAVE_FRIDGE_INGREDIENT':
      nextState = {
          ...state,
          FridgeIngredients: state.FridgeIngredients.filter(element => element.id != action.value.id)
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
          ShoppingIngredients: state.ShoppingIngredients.filter(element => element.id != action.value.id)
        };
      return nextState || state
    default:
      return state
  };
}

export default updateIngredients;
