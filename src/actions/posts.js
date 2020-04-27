import axios from "axios";
import { push, replace } from "connected-react-router";
import { routes } from "../containers/Router/";

const baseUrl = "https://us-central1-future-apis.cloudfunctions.net/fourEddit"
const token = localStorage.getItem("token")

export const setAllPosts = (post) => {
    return {
        type: "SET_ALL_POSTS",
        payload: {
            post
        }
    }
}

export const setPostDetails = (comment) => {
    return {
        type: "SET_POST_DETAILS",
        payload: {
            comment
        }
    }
}

export const getPosts = () => async (dispatch, getState) => {
    try {
        const response = await axios.get(
            `${baseUrl}/posts`, 
            {
                headers: {
                    auth: token
                }
            }
        )
        dispatch(setAllPosts(response.data.posts))
    } catch (error) {
        console.error(error)
    }
}

export const createPost = (post) => async (dispatch, getState) => {
    try {
        const response = await axios.post(
            `${baseUrl}/posts`, post, {
                headers: {
                    auth: token
                }
            }
        )
        dispatch(getPosts())
    } catch (error) {
        console.error(error)
    }
}

export const vote = (direction, id) => async (dispatch, getState) => {
    const body = {
        direction
    }
    try {
        const response = await axios.put(
            `${baseUrl}/posts/${id}/vote`, body, {
                headers: {
                    auth: token
                }
            }
        )
        dispatch(getPosts())
    } catch (error) {
        console.error(error)
    }
}

export const getPostDetails = (postId) => async (dispatch, getState) => {
    try {
        const response = await axios.get(
            `${baseUrl}/posts/${postId}`, {
                headers: {
                    auth: token
                }
            }
        )
        dispatch(setPostDetails(response.data.post.comments))
        dispatch(push(routes.details))
    } catch (error) {
        console.log(error)
    }
}