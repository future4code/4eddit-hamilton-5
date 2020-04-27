const initialState = {
    posts: [],
    comments: []
}

const posts = (state = initialState, action) => {
    switch(action.type) {
        case "SET_ALL_POSTS": {
            return {...state, posts: action.payload.post}
        }
        case "SET_POST_DETAILS": {
            return {...state, comments: action.payload.comment}
        }
        default:
            return state
    }
}

export default posts