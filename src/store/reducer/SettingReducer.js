const initialState = { FtoL:true , LtoF:true }

function settingPreferance (state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'UPLTOF':
            nextState = {
                ...state,
                LtoF: action.value
            }
            return nextState || state
        case 'UPFTOL':
            console.log('UPFTOL');
            nextState = {
                ...state,
                FtoL: action.value
            }
            return nextState || state
        default:
            return state
    };
}

export default settingPreferance;