import { useReducer } from "react";
import reducer, { initState } from "./Reducer";
import { SET_JOB, ADD_JOB, DELETE_JOB } from "./constants";
// Reducer:
function LearnUseReducer() {
  const [state, dispatch] = useReducer(reducer, initState);

  const { job, jobs } = state;

  return (
    <div>
      <h3>Todo</h3>
      <input
        type="text"
        placeholder="Enter job"
        value={job}
        onChange={(e) => dispatch({ type: SET_JOB, payload: e.target.value })}
      />
      <button onClick={() => dispatch({ type: ADD_JOB })}>Add Job</button>
      <ul>
        {jobs.map((item, index) => (
          <li key={index}>
            {item}
            <span
              style={{ marginLeft: "10px", cursor: "pointer", color: "red" }}
              onClick={() => dispatch({ type: DELETE_JOB, payload: index })}
            >
              x
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LearnUseReducer;
