const initialState = {
    posts: []
}

const posts = (state = initialState, action) => {
    switch(action.type) {
        case "SET_ALL_POSTS": {
            return {...state, posts: action.payload.post}
        }
        default:
            return state
    }
}

export default posts