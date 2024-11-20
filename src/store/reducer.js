import {
  SET_TODO_INPUT,
  ADD_TODO,
  DELETE_TODO,
  SAVE_TODO,
  CLEAR_ALL_TODO,
} from "./constants";

const initState = {
  todos: JSON.parse(localStorage.getItem("Todo useContext")) || [],
  todoInput: "",
};

function reducer(state, action) {
  switch (action.type) {
    case SET_TODO_INPUT:
      return {
        ...state,
        todoInput: action.payload,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case DELETE_TODO:
      const newTodos = [...state.todos];
      newTodos.splice(action.payload, 1);
      return {
        ...state,
        todos: newTodos,
      };
    case SAVE_TODO:
      localStorage.setItem("Todo useContext", JSON.stringify([...state.todos]));
      return state;
    case CLEAR_ALL_TODO:
      return {
        todos: [],
        todoInput: [],
      };
    default:
      throw new Error("Invalid action.");
  }
}

export { initState };
export default reducer;
