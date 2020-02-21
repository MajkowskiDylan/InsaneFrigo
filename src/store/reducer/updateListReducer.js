const initialState = { restaurantsID: [] }

function saveRestaurants(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SAVE_RESTAURANT':
      nextState = {
        ...state,
        restaurantsID: [...state.restaurantsID, action.value]
      };
      return nextState || state
    case 'UNSAVE_RESTAURANT':
        nextState = {
          ...state,
          restaurantsID: state.restaurantsID.filter(name => name !== action.value)
        };
      return nextState || state
    default:
      return state
  };
}

export default saveRestaurants;