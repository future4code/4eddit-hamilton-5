import axios from "axios";
import { replace } from "connected-react-router";
import { routes } from "../containers/Router/";
import { setLoading } from "./global";

const baseUrl = "https://us-central1-future-apis.cloudfunctions.net/fourEddit";

export const setLoginError = (error) => {
  return {
      type: "SET_LOGIN_ERROR",
      payload: {
          error
      }
  }
}


export const signUp = (body) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.post(`${baseUrl}/signup`, body);

    localStorage.setItem("token", response.data.token);
    dispatch(replace(routes.posts));
    dispatch(setLoading(false));
  } catch (error) {
    console.error(error);
  }
};

export const login = (body) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.post(`${baseUrl}/login`, body);

    localStorage.setItem("token", response.data.token);
    dispatch(replace(routes.posts));
    dispatch(setLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(setLoading(false));
    dispatch(setLoginError(true))
  }
};
