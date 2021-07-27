import api from "../../apiService";
import * as types from "../constants/calendar.constant";
import { toast } from "react-toastify";

const createCalendar = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_REQUEST, payload: null });
    const res = await api.post(`/calendar`, data);
    dispatch({ type: types.CREATE_SUCCESS, payload: res });
    toast.success(res.data.message);
  } catch (error) {
    dispatch({ type: types.CREATE_FAILURE, payload: error.message });
  }
};

const getListOfCalendar = (pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_LIST_REQUEST, payload: null });
    const res = await api.get(`/calendar?page=${pageNumber + option}`);
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

const getCustomList = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CUSTOM_REQUEST, payload: null });
    const res = await api.get(`/calendar/custom${data}`);
    dispatch({
      type: types.GET_CUSTOM_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({ type: types.GET_CUSTOM_FAILURE, payload: error.message });
  }
};

export const calendarAction = {
  createCalendar,
  getListOfCalendar,
  getCustomList,
};
