import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "./supabase";

function StartScreen({ setSelectedExercises }) {
  const navigation = useNavigation();
  const [templates, setTemplates] = useState([]);
  const [userXP, setUserXP] = useState(0);
  const [muscleRankings, setMuscleRankings] = useState({
    Chest: "Beginner",
    Back: "Beginner",
    Legs: "Beginner",
    Shoulders: "Beginner",
    Arms: "Beginner",
    Core: "Beginner",
  });

  useEffect(() => {
    fetchTemplates();
    fetchUserData();
  }, []);

  const fetchTemplates = async () => {
    const { data, error } = await supabase.from("templates").select("*");
    if (!error) setTemplates(data || []);
  };

  const fetchUserData = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("xp, muscle_rankings")
      .eq("id", "user-id");
    if (!error && data) {
      setUserXP(data[0].xp || 0);
      setMuscleRankings(data[0].muscle_rankings || muscleRankings);
    }
  };

  const calculateLevel = (xp) => Math.floor(Math.sqrt(xp));

  const muscleGroupRanks = {
    Beginner: 0,
    Novice: 100,
    Intermediate: 150,
    Advanced: 200,
    Elite: 300,
    WorldClass: 400,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start Workout</Text>
      <Text style={styles.level}>
        Level: {calculateLevel(userXP)} (XP: {userXP})
      </Text>
      <Text style={styles.rankings}>Muscle Rankings:</Text>
      {Object.entries(muscleRankings).map(([muscle, rank]) => (
        <Text key={muscle} style={styles.ranking}>
          {muscle}: {rank}
        </Text>
      ))}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Quick Start</Text>
        <Button
          title="Start an Empty Workout"
          color="#007AFF"
          onPress={() => alert("Starting an empty workout!")}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Templates</Text>
        <Button
          title="+ Add New Template"
          color="#007AFF"
          onPress={() => navigation.navigate("CreateTemplate")}
        />
        <Text style={styles.myTemplatesLabel}>
          My Templates ({templates.length})
        </Text>
        <FlatList
          data={templates}
          renderItem={({ item }) => (
            <View style={styles.templateCard}>
              <Text style={styles.templateTitle}>{item.name}</Text>
              <Text style={styles.templateExercises}>
                {item.exercises
                  ? item.exercises.map((e) => e.name).join(", ")
                  : "No exercises"}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f5f5f5", flex: 1 },
  title: { fontSize: 28, fontWeight: "bold", color: "#000", marginBottom: 10 },
  level: { fontSize: 18, color: "#000", marginBottom: 10 },
  rankings: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  ranking: { fontSize: 16, color: "#666", marginBottom: 5 },
  section: { marginBottom: 30 },
  sectionLabel: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#000",
  },
  myTemplatesLabel: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#000",
  },
  templateCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  templateTitle: { fontSize: 20, fontWeight: "bold", color: "#000" },
  templateExercises: { fontSize: 16, color: "#666" },
});

export default StartScreen;
