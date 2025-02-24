import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "./StartScreen";
import CreateTemplateScreen from "./CreateTemplateScreen";
import ExercisePickerScreen from "./ExercisePickerScreen";
import CreateNewExerciseScreen from "./CreateNewExerciseScreen";
import { supabase } from "./supabase";

const Stack = createNativeStackNavigator();

export default function App() {
  const [selectedExercises, setSelectedExercises] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start">
          {() => <StartScreen setSelectedExercises={setSelectedExercises} />}
        </Stack.Screen>
        <Stack.Screen name="CreateTemplate">
          {() => (
            <CreateTemplateScreen
              selectedExercises={selectedExercises}
              setSelectedExercises={setSelectedExercises}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ExercisePicker">
          {() => (
            <ExercisePickerScreen setSelectedExercises={setSelectedExercises} />
          )}
        </Stack.Screen>
        <Stack.Screen name="CreateNewExercise">
          {() => <CreateNewExerciseScreen />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
