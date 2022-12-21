import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutContext = () => {
  // our context
  const context = useContext(WorkoutContext) //returns the value of context , which is 
  // value we passed in provider component ===> state , dispatch

  if (!context) {
    throw Error('useWorkoutContext must be used inside an WorkoutContextProvider')
  }

  return context
}