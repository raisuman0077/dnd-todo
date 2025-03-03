const initialState = {};

export default function unScheduledTodo(state = initialState, { type, payload }) {
  switch (type) {
    case "POPULATE_UNSCHEDULED_ORDERED_TODO":
      return { ...payload };

    case "UPDATE_UNSCHEDULED_POSITION":
      if (!Array.isArray(payload)) return state;
      return Object.fromEntries(payload.map((item) => [item.id, item]));

    default:
      return state;
  }
}
