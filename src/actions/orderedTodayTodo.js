export const getOrderedTodayData = (data) => ({
  type: "POPULATE_TODAY_ORDERED_TODO",
  payload: data,
});
export const updateTodayDataPosition = (data) => ({
  type: "UPDATE_TODAY_ALL_POSITION",
  payload: data,
});
