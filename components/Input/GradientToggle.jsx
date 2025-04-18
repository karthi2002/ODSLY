import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../utils/Colors"; 

const GradientToggle = ({ label, initial = false, style }) => {
  const [isEnabled, setIsEnabled] = useState(initial);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <LinearGradient
      colors={["#029EFE", "#6945E2", "#E9098E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBorder}
    >
      <View style={[styles.innerBox, style]}>
        <Text style={styles.label}>{label}</Text>
        <Switch
          trackColor={{ false: "#FFFFFF", true: "#44A7FF" }}
          thumbColor={isEnabled ? "#1E2A5C" : "#1E2A5C"}
          ios_backgroundColor="#FFFFFF"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBorder: {
    padding: 2,
    borderRadius: 12,
    marginVertical: 6,
    width: "100%",
  },
  innerBox: {
    backgroundColor: Colors.background, 
   borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default GradientToggle;
