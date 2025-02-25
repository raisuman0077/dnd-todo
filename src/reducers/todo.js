const initialState = {};

export default function todo(state = initialState, { type, payload }) {
  switch (type) {
    case "POPULATE_TODO_DATA":
      return { ...payload };

    case "ADD_TODO":
      return {
        ...state,
        [payload.id]: payload,
      };

    case "DELETE_TODO":
      const updatedState = { ...state };
      delete updatedState[payload.id];
      return updatedState;

    case "UPDATE_TODO":
      return {
        ...state,
        [payload.id]: { ...state[payload.id], ...payload },
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          status: payload.status,
        },
      };
    default:
      return state;
  }
}
