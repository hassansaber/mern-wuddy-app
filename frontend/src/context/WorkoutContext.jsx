// create new context with this func
import { createContext, useReducer } from "react";

// new context
export const WorkoutContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

// provide the context to our application component tree (App.js)
export const WorkoutContextProvider = ({ children }) => {
  // look like useState
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  // type: describe the state change , payload: any data we need to make this change ===> action
  // dispatch({type:'SET_WORKOUTS',payload:[{},{}]})

  return (
    // template - the component
    <WorkoutContext.Provider value={{ ...state, dispatch }}>{children}</WorkoutContext.Provider>
  );
};
// now our components can access it
