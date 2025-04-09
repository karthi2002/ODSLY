import React, { useState } from "react";
import Colors from "../utils/Colors";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";

import Google from "../assets/icons/google.png";
import Apple from "../assets/icons/apple.png";
import Logo from "../layouts/Logo";
import TextInputField from "../components/Input/TextInputField";
import PasswordInputField from "../components/Input/PasswordInputField";
import LineText from "../layouts/LineText";
import GradientButton from "../components/Button/GradientButton";
import Copyright from "../layouts/Copyright";
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    Alert.alert("Login", `Email or Phone: ${emailOrPhone}\nPassword: ${password}`);
  };

  return (
    <View style={styles.container}>
      
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

        <Text style={styles.dontaccount}>Don't have a Account?</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.singup}>Sign Up</Text>
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
  },
  loginBox: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 30,
    width: "85%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
    color: Colors.primary,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 600,
    color: Colors.background,
    textDecorationLine: "underline",
    textAlign: "right",
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
    borderColor: Colors.LightGray,
    borderRadius: 5,
    padding: 10,
  },
  dontaccount: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 400,
  },
  singup :{
    color: Colors.background,
    fontSize: 18,
    fontWeight: 600,
    textDecorationLine: 'underline',
    marginTop: 2
  }
});

export default LoginScreen;
