const initialState = {
    messages: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case "ADD_MESSAGE":
            console.log('reducer')
            return {...state, messages: [action.payload, ...state.messages]}
        default:
            return state
    }
}