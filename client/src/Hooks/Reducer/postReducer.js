const postReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_POSTS_SUCCESS":
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: null,
      };
    case "GET_POSTS_FAILED":
      return {
        post: null,
        loading: true,
        error: null,
      };
    case "UPLOAD_POSTS_SUCCESS":
      return {
        post: action.payload,
        loading: false,
        error: null,
      };
    case "UPLOAD_POSTS_FAILED":
      return {
        loading: true,
        error: null,
      };
    case "DELETE_POSTS_SUCCESS":
      return {
        post: action.payload,
        loading: false,
        error: null,
      };
    case "DELETE_POSTS_FAILED":
      return {
        post: action.payload,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default postReducer;
