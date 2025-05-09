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
  const [fullNameError, setFullNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (confirmPassword.length > 0 && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError(null);
    }
  }, [password, confirmPassword]);

  const onSignupPress = async () => {
    // Client-side validation
    let hasError = false;

    if (!fullName.match(/[A-Za-z\s]+/)) {
      setFullNameError("Invalid full name");
      hasError = true;
    } else {
      setFullNameError(null);
    }

    if (!emailOrPhone.match(/^(\d{10}|[a-zA-Z0-9._%+-]+@gmail\.com)$/)) {
      setEmailError("Invalid email or phone number");
      hasError = true;
    } else {
      setEmailError(null);
    }

    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      setPasswordError("Password must be at least 8 characters, include uppercase, lowercase, number, and special character");
      hasError = true;
    } else {
      setPasswordError(null);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      hasError = true;
    } else if (!confirmPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      setConfirmPasswordError("Invalid confirm password");
      hasError = true;
    } else {
      setConfirmPasswordError(null);
    }

    if (!hasError) {
      setLoading(true);
      await handleSignup(fullName, emailOrPhone, password, navigation, {
        setFullNameError,
        setEmailError,
        setPasswordError,
        setConfirmPasswordError,
      });
      setLoading(false);
    }
  };

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
            setValue={(text) => {
              setFullName(text);
              setFullNameError(null); // Clear error on typing
            }}
            pattern="[A-Za-z\s]+" // Allow spaces
            errorMessage={fullNameError}
          />

          <TextInputField
            label="Email or Phone Number"
            value={emailOrPhone}
            setValue={(text) => {
              setEmailOrPhone(text);
              setEmailError(null); // Clear error on typing
            }}
            pattern="^(\d{10}|[a-zA-Z0-9._%+-]+@gmail\.com)$"
            errorMessage={emailError}
          />

          <PasswordInputField
            label="Password"
            value={password}
            setValue={(text) => {
              setPassword(text);
              setPasswordError(null); // Clear error on typing
            }}
            isPassword={true}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            errorMessage={passwordError}
          />

          <PasswordInputField
            label="Confirm Password"
            value={confirmPassword}
            setValue={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError(null); // Clear error on typing
            }}
            isPassword={true}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            errorMessage={confirmPasswordError}
          />

          <GradientButton
            label="Continue"
            onPress={onSignupPress}
            arrowEnable={true}
            disabled={loading}
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