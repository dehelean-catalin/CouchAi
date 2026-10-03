import { BaseText } from "@/components/BaseText";
import {
  formatTimestamp,
  calculateTimestampInSeconds,
} from "@/helper/dateFormatter";
import { useEffect, useState } from "react";

interface WorkoutTimerHeaderProps {
  startDate: string;
}

export function WorkoutTimerHeader(props: WorkoutTimerHeaderProps) {
  const timestampInSeconds = calculateTimestampInSeconds(
    props.startDate,
    new Date().toISOString(),
  );

  const [timer, setTimer] = useState(timestampInSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [props.startDate]);

  return <BaseText text={formatTimestamp(timer)} type="primary" />;
}
