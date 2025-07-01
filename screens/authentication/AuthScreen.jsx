import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Logo from "../../layouts/Logo";
import { useNavigation } from "@react-navigation/native";
import Banner from "../../assets/images/banner.png";
import GradientButton from "../../components/Button/GradientButton";
import Colors from "../../utils/Colors";
import GradientBorderButton from "../../components/Button/GradientBorderButton";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function AuthScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Logo />
      <Image source={Banner} style={styles.illustration} />
      <View style={styles.buttonContainer}>
        <GradientButton
          label="Sign Up"
          onPress={() => navigation.navigate("Signup")}
          arrowEnable={false}
          style={{ width: width * 0.85 - 0 }}
        />
        <GradientBorderButton
          title="Login"
          onPress={() => navigation.navigate("Login")}
          showBorderGradient={true}
          backgroundColor={Colors.background}
          textColor={Colors.secondary}
          showTextGradient={false}
          disabled={false}
          paddingVertical={12}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  illustration: {
  width: width * 0.8,
  height: height * 0.3, 
  resizeMode: "contain",
  marginTop: height * 0.05,
},
container: {
  flex: 1,
  backgroundColor: Colors.background,
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: height * 0.1,
},

  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
    gap:20,
    marginTop: 40,
  },
});
