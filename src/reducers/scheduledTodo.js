const initialState = {};

export default function scheduledTodo(state = initialState, { type, payload }) {
  switch (type) {
    case "POPULATE_SCHEDULED_ORDERED_TODO":
      return { ...payload };

    case "UPDATE_SCHEDULED_POSITION":
      if (!Array.isArray(payload)) return state;
      return Object.fromEntries(payload.map((item) => [item.id, item]));

    default:
      return state;
  }
}
