import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Picker,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "./supabase";

function CreateNewExerciseScreen() {
  const navigation = useNavigation();
  const [exerciseName, setExerciseName] = useState("");
  const [bodyPart, setBodyPart] = useState("None");
  const [category, setCategory] = useState("None");

  const saveExercise = async () => {
    if (!exerciseName.trim()) {
      alert("Please enter an exercise name!");
      return;
    }
    const newExercise = {
      name: exerciseName,
      bodyPart: bodyPart === "None" ? null : bodyPart,
      category: category === "None" ? null : category,
    };
    const { error } = await supabase.from("exercises").insert([newExercise]);
    if (!error) {
      setExerciseName("");
      setBodyPart("None");
      setCategory("None");
      navigation.navigate("ExercisePicker");
    } else {
      alert("Error saving exercise!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          title="X"
          color="#007AFF"
          onPress={() => navigation.navigate("ExercisePicker")}
        />
        <Text style={styles.title}>Create New Exercise</Text>
        <Button title="Save" color="#007AFF" onPress={saveExercise} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Add Name"
        value={exerciseName}
        onChangeText={setExerciseName}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Body Part</Text>
        <Picker
          style={styles.picker}
          selectedValue={bodyPart}
          onValueChange={(itemValue) => setBodyPart(itemValue)}
        >
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Chest" value="Chest" />
          <Picker.Item label="Back" value="Back" />
          <Picker.Item label="Legs" value="Legs" />
          <Picker.Item label="Shoulders" value="Shoulders" />
          <Picker.Item label="Arms" value="Arms" />
          <Picker.Item label="Core" value="Core" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Category</Text>
        <Picker
          style={styles.picker}
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Strength" value="Strength" />
          <Picker.Item label="Cardio" value="Cardio" />
          <Picker.Item label="Flexibility" value="Flexibility" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f5f5f5", flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#000" },
  input: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 18,
    backgroundColor: "#fff",
    width: "100%",
  },
  pickerContainer: { marginBottom: 15 },
  pickerLabel: { fontSize: 18, color: "#000", marginBottom: 5 },
  picker: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
});

export default CreateNewExerciseScreen;
