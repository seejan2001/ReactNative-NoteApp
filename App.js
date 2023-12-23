import Dashboard from "./pages/Dashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import NoteDetail from "./component/NoteDetail";
import Contexthook from "./component/Contexthook";
import { useNote } from "./component/Contexthook";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Contexthook>
          <Stack.Navigator
            screenOptions={{ headerTitle: "", headerTransparent: true }}
          >
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="NoteDetail" component={NoteDetail} />
          </Stack.Navigator>
        </Contexthook>
      </NavigationContainer>
    </>
  );
}
