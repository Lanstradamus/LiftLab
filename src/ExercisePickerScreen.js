import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "./supabase";

function ExercisePickerScreen({ setSelectedExercises }) {
  const navigation = useNavigation();
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    const { data, error } = await supabase.from("exercises").select("*");
    if (!error) setExercises(data || []);
  };

  const filteredExercises = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (exercise) => {
    setSelectedExercises((prev) => [...prev, exercise]);
    navigation.navigate("CreateTemplate");
  };

  return (
    <View style={styles.container}>
      <Button
        title="X"
        color="#007AFF"
        onPress={() => navigation.navigate("CreateTemplate")}
      />
      <Text style={styles.title}>Created Exercises</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search exercises..."
        value={search}
        onChangeText={setSearch}
      />
      <Button
        title="Create New Exercise"
        color="#007AFF"
        onPress={() => navigation.navigate("CreateNewExercise")}
      />
      <FlatList
        data={filteredExercises}
        renderItem={({ item }) => (
          <View
            style={styles.exerciseItem}
            onTouchEnd={() => handleSelect(item)}
          >
            <Text>
              {item.name} ({item.bodyPart || "Unknown"} /{" "}
              {item.category || "None"})
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f5f5f5", flex: 1 },
  title: { fontSize: 28, fontWeight: "bold", color: "#000", marginBottom: 20 },
  searchInput: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 18,
    backgroundColor: "#fff",
    width: "100%",
  },
  exerciseItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default ExercisePickerScreen;
