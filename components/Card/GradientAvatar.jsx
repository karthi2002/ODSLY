import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // or 'react-native-linear-gradient'

const GradientAvatar = ({ imageUrl, size = 100 }) => {
  const borderWidth = 4; // thickness of the gradient ring

  return (
    <LinearGradient
      colors={["#029EFE", "#E9098E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: size - borderWidth * 2,
          height: size - borderWidth * 2,
          borderRadius: (size - borderWidth * 2) / 2,
          overflow: "hidden",
          backgroundColor: "#fff", // Optional: fallback background
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
          }}
        />
      </View>
    </LinearGradient>
  );
};

export default GradientAvatar;
