import { SET_JOB, ADD_JOB, DELETE_JOB } from "./constants";

export const initState = {
  job: "",
  jobs: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_JOB:
      return {
        ...state,
        job: action.payload,
      };
    case ADD_JOB:
      return {
        jobs: [...state.jobs, state.job],
        job: "",
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((value, index) => index !== action.payload),
      };
    default:
      return state;
  }
};
export default reducer;
