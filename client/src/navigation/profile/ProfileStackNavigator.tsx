import { createNativeStackNavigator } from "@react-navigation/native-stack";
import routes, { RootStackParamList } from "../routes";
import { BaseText } from "@/components/BaseText";
import { useAppColors } from "@/theme/useAppColors";
import { ProfileScreen } from "@/screens/v2/Profile/ProfileScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function ProfileStackNavigator() {
  const { colors } = useAppColors();

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.surface0,
          padding: 8,
          paddingTop: 12,
        },
        headerStyle: { backgroundColor: colors.surface1 },
      }}
    >
      <Stack.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={{
          headerTitle: () => <BaseText text="Profile" type="primary_18" />,
        }}
      />
    </Stack.Navigator>
  );
}
