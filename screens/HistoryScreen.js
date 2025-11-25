import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { useReports } from "../store/report-context";
import ScreenBackground from "../components/ui/ScreenBackground";
import { Colors } from "../constants/style";

// Chip images
const chipGreen = require("../assets/green-chip.png");
const chipRed = require("../assets/red-chip.png");
const chipGold = require("../assets/gold-chip.png");

export default function HistoryScreen() {
  const { reports } = useReports();

  const renderItem = ({ item, index }) => {
    const isFirst = index === reports.length - 1; // earliest entry
    const isWin = item.gain >= 0;

    const chipImage = isFirst
      ? chipGold
      : isWin
      ? chipGreen
      : chipRed;

    const formattedDate = item.createdAt.toDate().toLocaleDateString("en-GB");

    return (
      <View style={styles.row}>
        {/* Timeline line */}
        <View style={styles.timelineLine} />

        {/* Chip */}
        <Image source={chipImage} style={styles.chip} />

        {/* Data */}
        <View style={styles.entryContainer}>
          <Text style={[styles.gain, isWin ? styles.green : styles.red]}>
            {isWin ? `+${item.gain}` : item.gain}₪
          </Text>

          <Text style={styles.balance}>Balance: {item.balance}₪</Text>

          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenBackground>
      <Text style={styles.title}>History</Text>

      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={styles.list}
      />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 40,
    color: Colors.primary100, // soft gold
    textShadowColor: "#000",
    textShadowRadius: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  timelineLine: {
    width: 3,
    height: "100%",
    backgroundColor: Colors.primary500, // gold
    marginRight: 20,
    borderRadius: 2,
  },

  chip: {
    width: 50,
    height: 50,
    marginRight: 16,
  },

  entryContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.primary500,
  },

  gain: {
    fontSize: 20,
    fontWeight: "bold",
  },

  green: {
    color: Colors.success500,
  },

  red: {
    color: Colors.error500,
  },

  balance: {
    color: Colors.primary100,
    marginTop: 6,
    fontSize: 16,
  },

  date: {
    color: Colors.gray,
    marginTop: 4,
    fontSize: 14,
  },
});
