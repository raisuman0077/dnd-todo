const initialState = {};

export default function orderedTodayTodo(state = initialState, { type, payload }) {
  switch (type) {
    case "POPULATE_TODAY_ORDERED_TODO":
      return { ...payload };

    case "UPDATE_TODAY_ALL_POSITION":
      if (!Array.isArray(payload)) return state;
      return Object.fromEntries(payload.map((item) => [item.id, item]));

    default:
      return state;
  }
}
