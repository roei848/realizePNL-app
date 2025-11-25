import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";
import { logout } from "../api/emailAuth";
import { useReports } from "../store/report-context";

export default function HomeScreen() {
  const { reports, addReport } = useReports();

  const [gainInput, setGainInput] = useState("");

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
    <ImageBackground
      style={styles.container}
      source={require("../assets/poker-table-green.jpg")} // add felt texture here
      resizeMode="cover"
    >
      <View style={styles.header}>
        {/* Title */}
        <Text style={styles.title}>Poker Status</Text>

        {/* Last Game */}
        <Text style={styles.lastGameText}>
          Last Gain:{" "}
          <Text
            style={[styles.bold, lastGain >= 0 ? styles.green : styles.red]}
          >
            {lastGain >= 0 ? `+${lastGain}` : lastGain}₪
          </Text>
        </Text>
      </View>

      {/* Roulette Balance Wheel */}
      <View style={styles.wheelContainer}>
        <Image
          source={require("../assets/roullette.png")}
          style={styles.wheelImage}
        />
        <View style={styles.balanceOverlay}>
          <Text style={styles.balanceText}>{lastBalance}₪</Text>
        </View>
      </View>

      {/* Update Stack Row */}
      <View style={styles.updateRow}>
        <Text style={styles.updateText}>Update Stack</Text>
        <TextInput
          style={styles.input}
          placeholder="Gain/Loss..."
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={gainInput}
          onChangeText={setGainInput}
        />
        <Pressable style={styles.updateButton} onPress={updateHandler}>
          <Text style={styles.updateButtonText}>Update</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingVertical: 80,
    alignItems: "center",
    justifyContent: "space-between",
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD700", // casino gold
    marginBottom: 10,
    textShadowColor: "black",
    textShadowRadius: 4,
  },

  lastGameText: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 25,
  },

  bold: {
    fontWeight: "bold",
  },

  green: {
    color: "#00FF88",
  },

  red: {
    color: "#FF4444",
  },

  wheelContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },

  wheelImage: {
    width: 260,
    height: 260,
    borderRadius: 130,
  },

  balanceOverlay: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },

  balanceText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFD700",
    textShadowColor: "#000",
    textShadowRadius: 8,
  },

  updateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },

  updateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    width: 120,
  },

  input: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: "#fff",
  },

  updateButton: {
    backgroundColor: "#D40000", // casino red
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFD700",
  },

  updateButtonText: {
    color: "#FFD700",
    fontWeight: "bold",
  },

  logoutButton: {
    marginTop: 40,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  logoutText: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
  },
});
