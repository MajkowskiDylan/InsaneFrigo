const initialState = { quota: 100, date: "null" }

function updateQuota(state = initialState, action) {
  let nextState
  let date = new Date().getDate(); //Current Date
  let month = new Date().getMonth() + 1; //Current Month
  let year = new Date().getFullYear(); //Current Year
  let hours = new Date().getHours(); //Current Hours
  let min = new Date().getMinutes(); //Current Minutes
  let sec = new Date().getSeconds(); //Current Seconds
  let currentDate = "" + date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec;
  const free =  150;
  switch (action.type) {
    case 'UPDATE':
      nextState = {
        ...state,
        quota: (free - action.value),
        date: currentDate
      }
      return nextState || state
    case 'CHANGE':
      nextState = {
        ...state,
        quota:state.quota + action.value,
        date: currentDate
      }
      return nextState || state
    default:
      return state
  };
}

export default updateQuota;
