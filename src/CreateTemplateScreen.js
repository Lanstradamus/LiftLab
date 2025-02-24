import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "./supabase";

function CreateTemplateScreen({ selectedExercises, setSelectedExercises }) {
  const navigation = useNavigation();
  const [templateName, setTemplateName] = useState("");
  const [notes, setNotes] = useState("");

  const saveTemplate = async () => {
    if (!templateName.trim() || selectedExercises.length === 0) {
      alert("Please enter a name and add at least one exercise!");
      return;
    }
    const newTemplate = {
      name: templateName,
      notes: notes,
      exercises: selectedExercises,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("templates").insert([newTemplate]);
    if (!error) {
      setTemplateName("");
      setNotes("");
      setSelectedExercises([]);
      navigation.navigate("Start");
    } else {
      alert("Error saving template!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          title="X"
          color="#007AFF"
          onPress={() => navigation.navigate("Start")}
        />
        <Text style={styles.title}>New Template</Text>
        <Button title="Save" color="#007AFF" onPress={saveTemplate} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Template name"
        value={templateName}
        onChangeText={setTemplateName}
      />
      <TextInput
        style={[styles.input, styles.notesInput]}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={4}
      />
      <Text style={styles.sectionTitle}>
        Exercises ({selectedExercises.length})
      </Text>
      <FlatList
        data={selectedExercises}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        title="Add Exercises"
        color="#007AFF"
        onPress={() => navigation.navigate("ExercisePicker")}
      />
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
  notesInput: { height: 100, textAlignVertical: "top" },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#000",
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

export default CreateTemplateScreen;
