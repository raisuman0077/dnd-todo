export const getScheduledOrderedData = (data) => ({
  type: "POPULATE_SCHEDULED_ORDERED_TODO",
  payload: data,
});
export const updateScheduledPosition = (data) => ({
  type: "UPDATE_SCHEDULED_POSITION",
  payload: data,
});
