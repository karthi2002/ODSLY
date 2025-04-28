import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import Logo from "../../layouts/Logo";
import TextInputField from "../../components/Input/TextInputField";
import GradientButton from "../../components/Button/GradientButton";
import Copyright from "../../layouts/Copyright";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../utils/Colors";
import { handleForgot } from "../../services/forgotPassword/Forgot";

const ForgotScreen = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Logo />

      <View style={styles.forgotBox}>
        <Text style={styles.title}>Forgot password?</Text>
        <Text style={styles.subTitle}>
          Please verify the OTP sent to your email / Phone Number
        </Text>

        <TextInputField
          label="Email or Phone Number"
          value={emailOrPhone}
          setValue={setEmailOrPhone}
          pattern="^(\d{10}|[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+)$"
          errorMessage={error}
        />

        <GradientButton
          label="Reset Password"
          onPress={() => {
            handleForgot(emailOrPhone, navigation, setError);
          }}
          arrowEnable={true}
        />

        <TouchableOpacity>
          <View style={styles.backContainer}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={18}
              color={Colors.primary}
            />
            <Text style={styles.back} onPress={() => navigation.goBack()}>
              Back
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Copyright />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  forgotBox: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 30,
    width: "85%",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
    color: Colors.background,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    marginTop: -25,
    marginBottom: 20,
    textAlign: "center",
    color: Colors.text,
    fontFamily: "500",
  },
  backContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  back: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: "600",
    textDecorationLine: "underline",
    marginTop: 2,
  },
});

export default ForgotScreen;
