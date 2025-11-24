import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useReports } from "../store/report-context";
import { Colors } from "../constants/style";
import Button from "../components/ui/Button";
import { logout } from "../api/emailAuth";

export default function HomeScreen() {
  const { reports, addReport } = useReports();

  const [gainInput, setGainInput] = useState("");

  // Determine last report
  const lastReport = reports.length > 0 ? reports[0] : null;

  const lastGain = lastReport ? lastReport.gain : 0;
  const lastBalance = lastReport ? lastReport.balance : 0;

  const updateHandler = async () => {
    if (!gainInput || isNaN(gainInput)) return;

    const gainValue = parseFloat(gainInput);

    const newBalance = lastBalance + gainValue;

    await addReport({
      gain: gainValue,
      balance: newBalance,
    });

    setGainInput("");
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Home</Text>

      {/* Last Game */}
      <Text style={styles.lastGameText}>
        Last Game: <Text style={styles.bold}>{lastGain}</Text>
      </Text>

      {/* Big Balance Circle */}
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>
            {lastBalance}
          </Text>
        </View>
      </View>

      {/* Update Row */}
      <View style={styles.updateRow}>
        <Text style={styles.updateLabel}>Update</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter gain..."
          placeholderTextColor={Colors.gray}
          keyboardType="numeric"
          value={gainInput}
          onChangeText={setGainInput}
        />

        <Pressable style={styles.updateButton} onPress={updateHandler}>
          <Text style={styles.updateButtonText}>Add</Text>
        </Pressable>
      </View>

      <Button onPress={logout}>Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.primary800,
    marginBottom: 20,
  },

  lastGameText: {
    fontSize: 18,
    color: Colors.gray,
    marginBottom: 30,
  },

  bold: {
    color: Colors.primary800,
    fontWeight: "bold",
  },

  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },

  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.accent500,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary800,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },

  circleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.primary800,
  },

  updateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  updateLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary800,
  },

  input: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    color: Colors.primary800,
  },

  updateButton: {
    backgroundColor: Colors.primary500,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  updateButtonText: {
    color: Colors.primary800,
    fontWeight: "bold",
  },
});
