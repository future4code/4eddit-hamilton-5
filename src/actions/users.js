import axios from "axios";
import { replace } from "connected-react-router";
import { routes } from "../containers/Router/";

const baseUrl = "https://us-central1-future-apis.cloudfunctions.net/fourEddit"

export const signUp = (body) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${baseUrl}/signup`,
      body
    );

    localStorage.setItem("token", response.data.token)
    dispatch(replace(routes.posts))
  } catch (error) {
    console.error(error);
  }
};

export const login = (body) => async (dispatch) => {
    try {
        const response = await axios.post(
            `${baseUrl}/login`, body 
        )

        localStorage.setItem("token", response.data.token)
        dispatch(replace(routes.posts))
    } catch (error) {
        console.error(error)
    }
}
