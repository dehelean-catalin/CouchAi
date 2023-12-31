import React, { FC, useEffect, useState } from "react";
import { Text } from "react-native-paper";

type Props = {
	startDate: number;
};

const Counter: FC<Props> = ({ startDate }) => {
	const [seconds, setSeconds] = useState(startDate);

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds(seconds + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [seconds]);

	return <Text variant="titleMedium">{timerFormat(seconds)}</Text>;
};

const timerFormat = (time: number) => {
	const hours = Math.floor(time / 3600);
	const minutes = Math.floor((time % 3600) / 60);
	const seconds = time % 60;

	if (hours === 0) {
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	}

	return `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export default Counter;
