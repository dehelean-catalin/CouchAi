import { WorkoutExerciseSet } from "@/redux/workoutSlice";

export function calculateWorkoutStats(
  workoutExercises: { sets: WorkoutExerciseSet[] }[],
) {
  let totalSets = 0;
  const totalWeight = workoutExercises.reduce((total, { sets }) => {
    if (sets.length === 0) {
      return total;
    }
    totalSets += sets.length;
    const exerciseTotal = sets.reduce((exerciseSum, set) => {
      if (set.weight === 0 || set.reps === 0) {
        return exerciseSum;
      }
      return set.weight * set.reps + exerciseSum;
    }, 0);
    return total + exerciseTotal;
  }, 0);

  return {
    totalWeight,
    totalSets,
  };
}

export function calculateWorkoutDuration(startDate: string, endDate: string) {
  const durationInSeconds =
    (Date.parse(endDate) - Date.parse(startDate)) / 1000;

  assertIsPositive(durationInSeconds);
  let seconds = Math.round(durationInSeconds);
  let minutes = 0;
  let hours = 0;

  if (seconds >= 60) {
    minutes = Math.floor(seconds / 60);
    seconds = Math.round(seconds % 60);
    if (minutes >= 60) {
      hours = Math.floor(minutes / 60);
      minutes = Math.round(minutes % 60);
    }
  }

  return { seconds, minutes, hours };
}

export function formatDuration({
  seconds,
  minutes,
  hours,
}: {
  seconds: number;
  minutes: number;
  hours: number;
}) {
  assertIsPositive(seconds);
  assertIsPositive(minutes);
  assertIsPositive(hours);

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function assertIsPositive(value: number) {
  if (value < 0) {
    throw new Error(`${value} is not a positive value`);
  }
}
