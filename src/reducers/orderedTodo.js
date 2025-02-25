const initialState = {};

export default function todo(state = initialState, { type, payload }) {
  switch (type) {
    case "POPULATE_ORDERED_TODO":
      return { ...payload };

    case "UPDATE_ALL_POSITION":
      if (!Array.isArray(payload)) return state;
      return Object.fromEntries(payload.map((item) => [item.id, item]));

    default:
      return state;
  }
}
