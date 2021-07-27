import api from "../../apiService";
import * as types from "../constants/drone.constant";
import { toast } from "react-toastify";

const createDrone = (data, pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_REQUEST, payload: null });
    const res = await api.post("/drone", data);
    dispatch({ type: types.CREATE_SUCCESS, payload: res });
    dispatch(getListOfDrone(pageNumber, option));
    toast.success(res.data.message);
  } catch (error) {
    dispatch({ type: types.CREATE_FAILURE, payload: error.message });
  }
};

const getListOfDrone = (pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_LIST_REQUEST, payload: null });
    const res = await api.get(`/drone?page=${pageNumber + option}`);
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

const getSingleDrone = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_REQUEST, payload: null });
    const data = await api.get(`/drone/${id}`);
    dispatch({ type: types.GET_SINGLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_FAILURE, payload: error.message });
  }
};

const updateSinlgeDrone =
  (id, data, pageNumber, option) => async (dispatch) => {
    try {
      dispatch({ type: types.UPDATE_DRONE_REQUEST, payload: null });
      const res = await api.put(`/drone/${id}`, data);
      dispatch({ type: types.UPDATE_DRONE_SUCCESS, payload: data });
      dispatch(getListOfDrone(pageNumber, option));
      toast.success(res.data.message);
    } catch (error) {
      dispatch({ type: types.UPDATE_DRONE_FAILURE, payload: error.message });
    }
  };

export const droneAction = {
  createDrone,
  getListOfDrone,
  getSingleDrone,
  updateSinlgeDrone,
};
