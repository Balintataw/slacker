const initialState = {
    messages: [],
    token: {},
    userData: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
        case "ADD_MESSAGE":
            return {...state, messages: [action.payload, ...state.messages]}
        case "ADD_TOKEN":
            return {...state, userData: {userName: action.payload.user}, token: action.payload.token}
        default:
            return state
    }
}
