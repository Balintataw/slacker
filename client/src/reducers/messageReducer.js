const initialState = {
    token: {},
    userName: '',
    fname: '',
    lname: '',
    email: '',
    profile_image: '',
    loginErrorMsg: '',
    profileData: {},
    isAuthenticated: false,
    currentRoom: 'general',
    rooms: ['general'],
    messages: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case "ADD_MESSAGE":
            return {...state, messages: [action.payload, ...state.messages]}
        case "JOIN_ROOM":
            return {...state, currentRoom: action.payload}
        case "UPDATE_ROOMS":
            return {...state, rooms: action.payload}
        case "ADD_IMAGE_URL":
            return {...state, profile_image: action.payload}
        case "ADD_TOKEN":  //login and register
            return {...state, token: action.payload.token, 
                              isAuthenticated: true,
                              loginErrorMsg: '',
                              userName: action.payload.user,
                              fname: action.payload.fname,
                              lname: action.payload.lname,
                              email: action.payload.email,
                              profile_image: action.payload.profile_image}
        case "LOGIN_ERROR":
            return {...state, loginErrorMsg: 'Incorrect user name and/or password'}
        case "LOGOUT":
            return {...state, isAuthenticated: false}
        case "GET_PROFILE_PAGE":
            return {...state, profileData: action.payload}
        default:
            return state
    }
}
