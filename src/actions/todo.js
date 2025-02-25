export const populateTodoData = (todo) => ({
  type: "POPULATE_TODO_DATA",
  payload: todo,
});

export const addTodo = (todo) => ({
  type: "ADD_TODO",
  payload: todo,
});

export const deleteTodo = (req) => ({
  type: "DELETE_TODO",
  payload: req,
});

export const updateTodo = (req) => ({
  type: "UPDATE_TODO",
  payload: req,
});
export const updateStatus = (req) => ({
  type: "UPDATE_STATUS",
  payload: req,
});
