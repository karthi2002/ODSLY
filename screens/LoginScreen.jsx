import React, { useState } from "react";
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

        <TouchableOpacity>
          <Text style={styles.link}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.loginWith}>Login with</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  logoText: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  loginBox: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  link: {
    color: "#000",
    marginBottom: 20,
    textAlign: "right",
  },
  loginButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    width: '100%',
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  loginText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  loginWith: {
    textAlign: "center",
    color: "#555",
  },
});

export default LoginScreen;
