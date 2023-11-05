import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Counter from "./Counter";

type Props = {
	navigation: StackNavigationProp<any>;
};

const WorkoutSession: FC<Props> = ({ navigation }) => {
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => <Button>FINISH</Button>,
			headerLeft: () => <Counter />,
		});
	}, [navigation]);

	return (
		<View>
			<Text>WorkoutSession</Text>

			<Button>ADD EXERCISES</Button>
		</View>
	);
};

export default WorkoutSession;

const styles = StyleSheet.create({});
