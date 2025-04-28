import React, { useEffect, useState } from "react";
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
} from "react-native";

import Google from "../../assets/icons/google.png";
import Apple from "../../assets/icons/apple.png";
import Logo from "../../layouts/Logo";
import TextInputField from "../../components/Input/TextInputField";
import PasswordInputField from "../../components/Input/PasswordInputField";
import LineText from "../../layouts/LineText";
import GradientButton from "../../components/Button/GradientButton";
import Copyright from "../../layouts/Copyright";
import { useNavigation } from "@react-navigation/native";
import { handleSignup } from "../../services/signup/Signup";

const SignupScreen = () => {
  const [fullName, setFullName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    if (confirmPassword.length > 0 && password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  }, [password, confirmPassword]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Logo />

        <View style={styles.signupBox}>
          <Text style={styles.title}>Sign Up!</Text>

          <TextInputField
            label="Full name"
            value={fullName}
            setValue={setFullName}
            pattern="[A-Za-z]+"
            errorMessage="Invalid"
          />

          <TextInputField
            label="Email or Phone Number"
            value={emailOrPhone}
            setValue={setEmailOrPhone}
            pattern="^(\d{10}|[a-zA-Z0-9._%+-]+@gmail\.com)$"
            errorMessage="Invalid"
          />

          <PasswordInputField
            label="Password"
            value={password}
            setValue={setPassword}
            isPassword={true}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            errorMessage="Invalid Password"
          />

          <PasswordInputField
            label="Confirm Password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            isPassword={true}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            errorMessage={error}
          />

          <GradientButton
            label="Continue"
            onPress={() => {
              if (password !== confirmPassword) {
                setError("Passwords do not match.");
              } else {
                setError("");
                handleSignup(fullName, emailOrPhone, password, navigation);
              }
            }}
            arrowEnable={true}
          />

          <LineText name="Continue with" />

          <View style={styles.authContainer}>
            <TouchableOpacity>
              <Image style={styles.authLogo} source={Google} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.authLogo} source={Apple} />
            </TouchableOpacity>
          </View>

          <LineText name="OR" />

          <Text style={styles.alreadyaccount}>Already have an Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>
        </View>

        <Copyright />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 50,
  },
  signupBox: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 20,
    marginTop: 30,
    width: "85%",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
    color: Colors.background,
    fontWeight: "bold",
  },
  authContainer: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 20,
    marginVertical: 10,
  },
  authLogo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: Colors.LightGray,
    borderRadius: 5,
    padding: 10,
  },
  alreadyaccount: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "400",
  },
  login: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: "600",
    textDecorationLine: "underline",
    marginTop: 2,
  },
});

export default SignupScreen;
