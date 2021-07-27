import api from "../../apiService";
import * as types from "../constants/requester.constant";
import { toast } from "react-toastify";

const getListOfRequester = (pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_LIST_REQUEST, payload: null });
    const res = await api.get(`/requester?page=${pageNumber + option}`);
    console.log(res);
    dispatch({
      type: types.GET_LIST_SUCCESS,
      payload: {
        data: res,
        totalPage: res.data.data.totalPage,
      },
    });
  } catch (error) {
    dispatch({ type: types.GET_LIST_FAILURE, payload: error.message });
  }
};

const getCurrentRequester = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CURRENT_REQUEST, payload: null });
    const res = await api.get("/requester/me");
    dispatch({ type: types.GET_CURRENT_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_FAILURE, payload: error.message });
  }
};

const getSingleRequester = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_REQUEST, payload: null });
    const data = await api.get(`/requester/${id}`);
    dispatch({ type: types.GET_SINGLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_FAILURE, payload: error.message });
  }
};

const updateSinlgeUser = (id, data, pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_REQUESTER_REQUEST, payload: null });
    const res = await api.put(`/requester/${id}`, data);
    dispatch({ type: types.UPDATE_REQUESTER_SUCCESS, payload: data });
    dispatch(getListOfRequester(pageNumber, option));
    toast.success(res.data.message);
  } catch (error) {
    dispatch({ type: types.UPDATE_REQUESTER_FAILURE, payload: error.message });
  }
};

export const requesterAction = {
  getListOfRequester,
  getCurrentRequester,
  getSingleRequester,
  updateSinlgeUser,
};
