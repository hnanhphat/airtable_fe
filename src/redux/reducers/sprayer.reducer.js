import * as types from "../constants/sprayer.constant";

const initialState = {
  sprayers: [],
  singleSprayer: [],
  totalPage: 1,
  loading: false,
  error: "",
};

const sprayerReducer = (state = initialState, action) => {
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
      state.sprayers = payload.data;
      state.totalPage = payload.totalPage;
      state.loading = false;
      break;
    case types.GET_LIST_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // GET SINGLE
    case types.GET_SINGLE_REQUEST:
      state.loading = true;
      break;
    case types.GET_SINGLE_SUCCESS:
      state.singleSprayer = payload;
      state.loading = false;
      break;
    case types.GET_SINGLE_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // UPDATE SINGLE
    case types.UPDATE_SPRAYER_REQUEST:
      state.loading = true;
      break;
    case types.UPDATE_SPRAYER_SUCCESS:
      state.loading = false;
      break;
    case types.UPDATE_SPRAYER_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    default:
      break;
  }

  return { ...state };
};

export default sprayerReducer;
