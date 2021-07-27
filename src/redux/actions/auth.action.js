import api from "../../apiService";
import * as types from "../constants/auth.constant";
import { toast } from "react-toastify";

const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_REQUEST, payload: null });
    const res = await api.post("/requester", data);
    dispatch({ type: types.REGISTER_SUCCESS, payload: res });
    toast.success(res.data.message);
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error.message });
  }
};

const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST, payload: null });
    const res = await api.post("/auth/login", data);
    localStorage.setItem("accessToken", res.data.data.accessToken);
    api.defaults.headers["authorization"] =
      "Bearer " + localStorage.getItem("accessToken");
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data.data.accessToken,
    });
    toast.success(`Welcom ${res.data.data.requester.lastname}`);
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: error.message });
  }
};

const logout = () => async (dispatch) => {
  try {
    dispatch({ type: types.LOGOUT_REQUEST, payload: null });
    dispatch({ type: types.LOGOUT_SUCCESS, payload: null });
    api.defaults.headers["authorization"] =
      "Bearer " + localStorage.getItem("accessToken");
  } catch (error) {
    dispatch({ type: types.LOGOUT_FAILURE, payload: error.message });
  }
};

export const authAction = {
  register,
  login,
  logout,
};
