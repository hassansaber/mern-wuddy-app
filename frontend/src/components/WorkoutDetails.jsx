const { useWorkoutContext } = require("../hooks/useWorkoutContext");

const WorkoutDetails = ({ workout }) => {
  const { title, load, reps, createdAt } = workout;
  const { dispatch } = useWorkoutContext();

  const handleClick = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{title}</h4>
      <p>
        <strong>Load (kg) : </strong>
        {load}
      </p>
      <p>
        <strong>Reps : </strong>
        {reps}
      </p>
      <p>{createdAt}</p>
      <span onClick={handleClick}>Delete</span>
    </div>
  );
};

export default WorkoutDetails;
