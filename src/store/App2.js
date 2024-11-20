import { useRef } from "react";
import { useStore, actions } from ".";

function App2() {
  const [state, dispatch] = useStore();
  const { todos, todoInput } = state;

  const { setTodoInput, addTodo, deleteTodo, saveTodo, clearAllTodo } = actions;

  const inputRef = useRef();

  const handleAdd = () => {
    dispatch(addTodo(todoInput));
    dispatch(setTodoInput(""));
    inputRef.current.focus();
  };

  const handleSave = () => {
    dispatch(saveTodo(todos));
    dispatch(setTodoInput(""));
    inputRef.current.focus();
  };

  const handleClearAll = () => {
    dispatch(clearAllTodo(todos));
    dispatch(setTodoInput(""));
    inputRef.current.focus();
  };
  return (
    <div style={{ padding: 20 }}>
      <input
        value={todoInput}
        placeholder="Enter todo..."
        ref={inputRef}
        onChange={(e) => {
          dispatch(setTodoInput(e.target.value));
        }}
      />
      <button style={{ marginLeft: 20 }} onClick={handleAdd}>
        Add
      </button>
      <button style={{ marginLeft: 20 }} onClick={handleClearAll}>
        Clear All
      </button>
      <button style={{ marginLeft: 20 }} onClick={handleSave}>
        Save
      </button>

      {todos.map((todo, index) => (
        <li key={index}>
          {todo}
          <span>
            <i
              style={{ paddingLeft: 20, cursor: "pointer" }}
              onClick={() => dispatch(deleteTodo(index))}
            >
              &times;
            </i>
          </span>
        </li>
      ))}
    </div>
  );
}

export default App2;
