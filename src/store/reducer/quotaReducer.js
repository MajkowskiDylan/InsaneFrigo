const initialState = { quota: 100 }

function updateQuota(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'UPDATE':
      nextState = {
        ...state,
        quota: 100
      }
      return nextState || state
    default:
      return state
  };
}

export default updateQuota;
