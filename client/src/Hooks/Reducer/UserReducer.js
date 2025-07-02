const userReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN_SUCCESS":
    case "SIGNUP_SUCCESS":
    case "AUTH_SUCCESS":
      return {
        ...state,
        loading: false,
        authenticate: true,
        user: action.payload,
      };

    case "SIGNIN_FAILED":
    case "SIGNUP_FAILED":
    case "AUTH_FAILED":
      return {
        ...state,
        loading: false,
        authenticate: false,
        user: null,
      };

    default:
      return state;
  }
};

export default userReducer;
