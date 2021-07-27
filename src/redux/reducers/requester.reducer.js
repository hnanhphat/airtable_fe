import * as types from "../constants/requester.constant";

const initialState = {
  requesters: [],
  requester: [],
  singleRequester: [],
  totalPage: 1,
  loading: false,
  error: "",
};

const requesterReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // GET LIST
    case types.GET_LIST_REQUEST:
      state.loading = true;
      break;
    case types.GET_LIST_SUCCESS:
      state.requesters = payload.data;
      state.totalPage = payload.totalPage;
      state.loading = false;
      break;
    case types.GET_LIST_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // GET CURRENT
    case types.GET_CURRENT_REQUEST:
      state.loading = true;
      break;
    case types.GET_CURRENT_SUCCESS:
      state.requester = payload.data;
      state.loading = false;
      break;
    case types.GET_CURRENT_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // GET SINGLE
    case types.GET_SINGLE_REQUEST:
      state.loading = true;
      break;
    case types.GET_SINGLE_SUCCESS:
      state.singleRequester = payload;
      state.loading = false;
      break;
    case types.GET_SINGLE_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // UPDATE SINGLE
    case types.UPDATE_REQUESTER_REQUEST:
      state.loading = true;
      break;
    case types.UPDATE_REQUESTER_SUCCESS:
      state.loading = false;
      break;
    case types.UPDATE_REQUESTER_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    default:
      break;
  }

  return { ...state };
};

export default requesterReducer;
