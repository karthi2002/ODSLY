import React, { useEffect, useState } from "react";
import Colors from "../../utils/Colors";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
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


const SignupScreen = () => {
  
  const [fullName, setFullName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError]= useState("")
  const navigation = useNavigation();

  useEffect(() => {
    if (confirmPassword.length > 0 && password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  }, [password, confirmPassword]);
  
  

  const handleSignup = () => {
    navigation.navigate('VerifyOTP');
  };

  return (
    <View style={styles.container}>

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

    <PasswordInputField
        label="Confirm Password"
        value={confirmPassword}
        setValue={setConfirmPassword}
        isPassword={true}
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        errorMessage={error}
      />


        <GradientButton label="Continue" onPress={handleSignup} arrowEnable={true} />

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

        <Text style={styles.alreadyaccount}>Already have a Account?</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.login}>Login</Text>
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
    paddingVertical: 50
  },
  signupBox: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 20,
    marginTop: 30,
    width: "85%",
    alignItems: "center",
    flex: 1
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
    color: Colors.background,
    fontWeight: "bold",
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
  alreadyaccount: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 400,
  },
  login :{
    color: Colors.background,
    fontSize: 18,
    fontWeight: 600,
    textDecorationLine: 'underline',
    marginTop: 2
  }
});

export default SignupScreen;
