const initialState = {
    messages: [],
    token: {},
    // userData: {},
    userName: '',
    fname: '',
    lname: '',
    email: '',
    profile_image: '',
    loginErrorMsg: '',
    profileData: {},
    isAuthenticated: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case "ADD_MESSAGE":
            return {...state, messages: [action.payload, ...state.messages]}
        case "ADD_TOKEN":  //login and register
            // console.log('add_token payload ' + JSON.stringify(action.payload))
            return {...state, token: action.payload.token, 
                              isAuthenticated: true,
                              loginErrorMsg: '',
                              userName: action.payload.user,
                              fname: action.payload.fname,
                              lname: action.payload.lname,
                              email: action.payload.email,
                              image: action.payload.profile_image}
        case "LOGIN_ERROR":
            return {...state, loginErrorMsg: 'Incorrect user name and/or password'}                         
        case "GET_PROFILE_PAGE":
            return {...state, profileData: action.payload}
        default:
            return state
    }
}
