import * as types from "../constants/auth.constant";

const initialState = {
  isAuth: localStorage.getItem("accessToken"),
  loading: false,
  error: "",
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // REGISTER
    case types.REGISTER_REQUEST:
      state.loading = true;
      break;
    case types.REGISTER_SUCCESS:
      state.loading = false;
      break;
    case types.REGISTER_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // LOGIN
    case types.LOGIN_REQUEST:
      state.loading = true;
      break;
    case types.LOGIN_SUCCESS:
      state.isAuth = payload;
      state.loading = false;
      break;
    case types.LOGIN_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // LOGOUT
    case types.LOGOUT_REQUEST:
      state.loading = true;
      break;
    case types.LOGOUT_SUCCESS:
      state.isAuth = "";
      state.loading = false;
      break;
    case types.LOGOUT_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    default:
      return state;
  }

  return { ...state };
};

export default authReducer;
