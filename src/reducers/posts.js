const initialState = {
    posts: [],
    post: []
}

const posts = (state = initialState, action) => {
    switch(action.type) {
        case "SET_ALL_POSTS": {
            return {...state, posts: action.payload.post}
        }
        case "SET_POST_DETAILS": {
            return {...state, post: action.payload.comment}
        }
        default:
            return state
    }
}

export default posts