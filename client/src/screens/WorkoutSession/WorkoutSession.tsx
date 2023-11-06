import routes from "@/constant/routes";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Counter from "./Counter";

type Props = {
	navigation: StackNavigationProp<any>;
	route: any;
};

const WorkoutSession: FC<Props> = ({ navigation, route }) => {
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => <Button>FINISH</Button>,
			headerTitle: () => <Counter />,
		});
	}, [navigation]);

	const handleAddExercises = () => {
		navigation.navigate(routes.EXERCISE, {
			id: route?.params?.id,
			session: true,
		});
	};

	return (
		<View>
			<Text>WorkoutSession</Text>

			<Button onPress={handleAddExercises}>ADD EXERCISES</Button>
		</View>
	);
};

export default WorkoutSession;

const styles = StyleSheet.create({});
