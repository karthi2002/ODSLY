import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../../utils/Colors";

const GradientCheckbox = ({ label, checked, onToggle }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle}>
      {checked ? (
        <LinearGradient
          colors={['#029EFE', '#6945E2', '#E9098E']}
          locations={[0, 0.37, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBorder}
        >
          <View style={styles.innerBox} />
        </LinearGradient>
      ) : (
        <View style={styles.uncheckedBox} />
      )}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  gradientBorder: {
    width: 20,
    height: 20,
    borderRadius: 4,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  innerBox: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.background,
    borderRadius: 2,
  },
  uncheckedBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.secondary,
    backgroundColor: Colors.background,
  },
  label: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
});

export default GradientCheckbox;
