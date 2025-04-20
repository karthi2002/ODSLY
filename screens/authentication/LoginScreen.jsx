import React, { useState } from "react";
import Colors from "../../utils/Colors";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from "react-native";

import Google from "../../assets/icons/google.png";
import Apple from "../../assets/icons/apple.png";
import Logo from "../../layouts/Logo";
import TextInputField from "../../components/Input/TextInputField";
import PasswordInputField from "../../components/Input/PasswordInputField";
import LineText from "../../layouts/LineText";
import GradientButton from "../../components/Button/GradientButton";
import Copyright from "../../layouts/Copyright";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('MainTab');
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Logo />

        <View style={styles.loginBox}>
          <Text style={styles.title}>Login!</Text>

          <TextInputField
            label="Email or Phone Number"
            value={emailOrPhone}
            setValue={setEmailOrPhone}
            pattern="^(\d{10}|[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+)$"
            errorMessage="Invalid"
          />

          <PasswordInputField
            label="Password"
            value={password}
            setValue={setPassword}
            isPassword={true}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            errorMessage="Incorrect Password"
          />

          <View style={styles.forgotContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
              <Text style={styles.link}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <GradientButton label="Login" onPress={handleLogin} arrowEnable={true} />

          <LineText name="Login With" />

          <View style={styles.authContainer}>
            <TouchableOpacity>
              <Image style={styles.authLogo} source={Google} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.authLogo} source={Apple} />
            </TouchableOpacity>
          </View>

          <LineText name="OR" />

          <Text style={styles.dontaccount}>Don't have an Account?</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.singup}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <Copyright />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height * 0.05,
  },
  loginBox: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 30,
    width: width * 0.85,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
    color: Colors.background,
    fontWeight: "bold",
  },
  forgotContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  link: {
    color: Colors.background,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
    textAlign: "right",
  },
  authContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    gap: 20,
  },
  authLogo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: Colors.LightGray,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  dontaccount: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "400",
    marginTop: 20,
  },
  singup: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: "600",
    textDecorationLine: 'underline',
    marginTop: 2
  }
});

export default LoginScreen;
