import * as types from "../constants/calendar.constant";

const initialState = {
  calendars: [],
  custom: [],
  totalPage: 1,
  loading: false,
  error: "",
};

const calendarReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // CREATE
    case types.CREATE_REQUEST:
      state.loading = true;
      break;
    case types.CREATE_SUCCESS:
      state.loading = false;
      break;
    case types.CREATE_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // GET LIST
    case types.GET_LIST_REQUEST:
      state.loading = true;
      break;
    case types.GET_LIST_SUCCESS:
      state.calendars = payload.data;
      state.totalPage = payload.totalPage;
      state.loading = false;
      break;
    case types.GET_LIST_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // GET LIST
    case types.GET_CUSTOM_REQUEST:
      state.loading = true;
      break;
    case types.GET_CUSTOM_SUCCESS:
      state.custom = payload.data;
      state.loading = false;
      break;
    case types.GET_CUSTOM_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    default:
      break;
  }

  return { ...state };
};

export default calendarReducer;
