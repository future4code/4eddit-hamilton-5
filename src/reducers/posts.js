const initialState = {
    posts: [],
    post: null,
    isLoading: false,
    loginError: false
}

const posts = (state = initialState, action) => {
    switch(action.type) {
        case "SET_ALL_POSTS": {
            return {...state, posts: action.payload.post}
        }
        case "SET_POST_DETAILS": {
            return {...state, post: action.payload.comment}
        }
        case "SET_LOADING": {
            return {...state, isLoading: action.payload.loading}
        }

        case "SET_LOGIN_ERROR": {
            return {...state, loginError: action.payload.error}
        }

        default:
            return state
    }
}

export default posts
