import React, { useState } from "react";
import colors from "../utils/Colors";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";

import Logo from "../assets/icons/Logo.png";
import Google from "../assets/icons/google.png";
import Apple from "../assets/icons/apple.png";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    Alert.alert("Login", `Email: ${email}\nPassword: ${password}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.logoText}>ODSLY</Text>
      </View>

      <View style={styles.loginBox}>
        <Text style={styles.title}>Login!</Text>

        <TextInput
          placeholder="Email or Phone Number"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <View style={styles.forgotContainer}>
          <TouchableOpacity>
            <Text style={styles.link}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.loginWithContainer}>
          <View style={styles.line} />
          <Text style={styles.loginWith}>Login with</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.authContainer}>
          <TouchableOpacity>
            <Image style={styles.authLogo} source={Google} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.authLogo} source={Apple} />
          </TouchableOpacity>
        </View>

        <View style={styles.loginWithContainer}>
          <View style={styles.line} />
          <Text style={styles.loginWith}>OR</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity>
          <Text style={styles.dontaccount}>Don't have a Account?</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.singup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  logoText: {
    color: colors.secondary,
    fontSize: 42,
    fontWeight: "bold",
  },
  loginBox: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: "85%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
    color: colors.background,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    width: "100%",
    color: colors.text,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  forgotContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: -8
  },
  link: {
    color: "#000",
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "600",
    color: colors.background,
    textDecorationLine: "underline",
    textAlign: "right",
  },
  loginButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  loginText: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: "600",
  },
  loginWithContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
  loginWith: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 500,
  },
  authContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  authLogo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  dontaccount: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 400,
  },
  singup :{
    color: colors.background,
    fontSize: 18,
    fontWeight: 600,
    textDecorationLine: 'underline',
    marginTop: 2
  }
});

export default LoginScreen;
