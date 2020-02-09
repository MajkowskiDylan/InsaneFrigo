const initialState = { quota: 100 }

function updateQuota(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'UPDATE':
      nextState = {
        ...state,
        quota: action.value
      }
      return nextState || state
    case 'CHANGE':
      nextState = {
        ...state,
        quota:state.quota + action.value
      }
      return nextState || state
    default:
      return state
  };
}

export default updateQuota;
