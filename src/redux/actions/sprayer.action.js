import api from "../../apiService";
import * as types from "../constants/sprayer.constant";
import { toast } from "react-toastify";

const createSprayer = (data, pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_REQUEST, payload: null });
    const res = await api.post("/sprayer", data);
    dispatch({ type: types.CREATE_SUCCESS, payload: res });
    dispatch(getListOfSprayer(pageNumber, option));
    toast.success(res.data.message);
  } catch (error) {
    dispatch({ type: types.CREATE_FAILURE, payload: error.message });
  }
};

const getListOfSprayer = (pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_LIST_REQUEST, payload: null });
    const res = await api.get(`/sprayer?page=${pageNumber + option}`);
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

const getSingleSprayer = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_REQUEST, payload: null });
    const data = await api.get(`/sprayer/${id}`);
    dispatch({ type: types.GET_SINGLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_FAILURE, payload: error.message });
  }
};

const updateSinlgeSprayer =
  (id, data, pageNumber, option) => async (dispatch) => {
    try {
      dispatch({ type: types.UPDATE_SPRAYER_REQUEST, payload: null });
      const res = await api.put(`/sprayer/${id}`, data);
      dispatch({ type: types.UPDATE_SPRAYER_SUCCESS, payload: data });
      dispatch(getListOfSprayer(pageNumber, option));
      toast.success(res.data.message);
    } catch (error) {
      dispatch({ type: types.UPDATE_SPRAYER_FAILURE, payload: error.message });
    }
  };

export const sprayerAction = {
  createSprayer,
  getListOfSprayer,
  getSingleSprayer,
  updateSinlgeSprayer,
};
