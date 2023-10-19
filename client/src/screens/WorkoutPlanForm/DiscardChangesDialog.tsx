import { RootState } from "@/src/redux/store";
import { workoutFormActions } from "@/src/redux/workoutFormReducer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

const DiscardChangesDialog = () => {
	const dispatch = useDispatch();
	const { goBack } = useNavigation<NativeStackNavigationProp<any>>();

	const visible = useSelector<RootState, boolean>(
		(s) => s.workoutForm.showDialog
	);

	const hideDialog = () => dispatch(workoutFormActions.toggleDialog(false));

	const discardChanges = () => {
		dispatch(workoutFormActions.clearState());
		goBack();
	};

	return (
		<Dialog visible={visible} onDismiss={hideDialog}>
			<Dialog.Title>Discard Changes</Dialog.Title>
			<Dialog.Content>
				<Text variant="bodyMedium">
					Are you sure you want to discard your changes?
				</Text>
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={hideDialog}>Keep editing</Button>
				<Button onPress={discardChanges}>Discard</Button>
			</Dialog.Actions>
		</Dialog>
	);
};

export default DiscardChangesDialog;

const styles = StyleSheet.create({});
