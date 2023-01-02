import { useAuthContext } from "./useAuthContext"
import { useWorkoutContext } from "../hooks/useWorkoutContext";

export const useLogout = () => {

  const { dispatch: userDispatch } = useAuthContext()
  const { dispatch: workoutDispatch } = useWorkoutContext()

  const logout = () => {
    // remove user from local storage
    localStorage.removeItem('user')

    // dispatch logout action 
    userDispatch({
      type: "LOGOUT",
    })
    workoutDispatch({
      type: "SET_WORKOUTS",
      payload: null
    })
  }
  return { logout }
}