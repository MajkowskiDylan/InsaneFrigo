const initialState = { FridgeIngredients: [{"name": "Testnom", "aisle": "Testrayon"},{"name": "Ice", "aisle": "Frozen"}], ShoppingIngredients:[{"name": "Testnom", "aisle": "Testrayon"}] }

function updateIngredients(state = initialState, action) {
  let nextState
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
