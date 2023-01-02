// create new context with this func
import { createContext, useReducer } from "react";

// -1 new context
export const WorkoutContext = createContext();

// 0 provide the context to our application component tree (App.js)
export const WorkoutContextProvider = ({ children }) => {
  // 3
  const initialWorkoutsValue = {
    workouts: null,
  };
  // 3 state is our state to set in value prop
  // 3 dispatch is its func for update of changes
  // 3 initialWorkoutsValue is state's initial value
  // 3 workoutsReducer is our reducer , to handel state's value based on dispatch
  const [state, dispatch] = useReducer(workoutsReducer, initialWorkoutsValue);

  return (
    // template -> the workout context component

    // 2 value => whatever value sets ,available in the whole application . this is context in react
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {/* 1 wrap whole app in it -> root app component  */}
      {/* 1 destructure children property from props in WorkoutContext component */}
      {children}
      {/* 1 children=> represents whatever WorkoutContext component accepting as a props */}
      {/* 1 children=> represents App component */}
    </WorkoutContext.Provider>
  );
};
// now our components can access it

// 4 dispatch({type:'SET_WORKOUTS',payload:[{},{}]})
// 4 type: describe the state changes , payload: any data we needs to make this change ===> action

// 5 when we call dispatch func => our reducer func is invoke
// 5 reducer
// 5 updating state
export const workoutsReducer = (state, action) => {
  // 6 state => previous state before making change - reliable state value
  // 6 action => the object we pass into dispatch func - had type and payload

  switch (action.type) {
    // {workouts} or {[w1,w2,...]} => its what reducer func returns -
    // = the array of workouts list - the (new)state

    case "SET_WORKOUTS": // get all workouts
      return {
        workouts: action.payload, //payload should be state value
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts], //...state.workouts = w1,w2,...
        // whole list is in a []
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};
