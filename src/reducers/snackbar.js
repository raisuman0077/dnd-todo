const initialState = {
  type: "",
  message: "",
  open: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_SNACKBAR":
      return { ...payload, open: true };
    case "RESET_SNACKBAR":
      return { initialState };
    default:
      return state;
  }
};
