import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../utils/Colors";
import GradientIcon from "../Button/GradientIcon";

const GradientField = ({ label, status, showIcons }) => {
  return (
    <LinearGradient
      colors={["#029EFE", "#6945E2", "#E9098E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBorder}
    >
      <View style={styles.innerBox}>
        <View style={styles.leftSection}>
          <Text style={styles.label}>{label}</Text>
          {status && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Connected</Text>
            </View>
          )}
        </View>
        <View style={styles.iconSection}>
          {showIcons === "double" && (
            <>
              <TouchableOpacity style={styles.iconBtn}>
                <GradientIcon
                  name="xmark"
                  size={26}
                  gradientColors={["#029EFE", "#E9098E"]}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <GradientIcon
                  name="rotate"
                  size={22}
                  gradientColors={["#029EFE", "#E9098E"]}
                />
              </TouchableOpacity>
            </>
          )}
          {showIcons === "external" && (
            <TouchableOpacity style={styles.iconBtn}>
              <GradientIcon
                name="arrow-up-right-from-square"
                size={20}
                gradientColors={["#029EFE", "#E9098E"]}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBorder: {
    padding: 2,
    borderRadius: 12,
    marginVertical: 6,
  },
  innerBox: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  label: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
  statusBadge: {
    backgroundColor: "#037171",
    fontWeight: '500',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: Colors.secondary,
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "500",
  },
  iconSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  iconBtn: {
    padding: 4,
  },
});

export default GradientField;
