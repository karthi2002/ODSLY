import React, { useEffect, useState } from "react";
import Colors from "../utils/Colors";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Logo from "../layouts/Logo";
import GradientButton from "../components/GradientButton";
import Copyright from "../layouts/Copyright";
import { useNavigation } from '@react-navigation/native';
import PasswordInputField from "../components/PasswordInputField";


const ResetPasswordScreen = () => {

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

  const handleResetPassword = () => {
    navigation.navigate('Login')
  };

  return (
    <View style={styles.container}>
      
      <Logo />

      <View style={styles.resetPasswordBox}>
        <Text style={styles.title}>Reset password?</Text>
        <Text style={styles.subTitle}>Create a New Password</Text>

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


        <GradientButton label="Reset Password" onPress={handleResetPassword} arrowEnable={true} />

        <TouchableOpacity>
            <View style={styles.backContainer}>
                <MaterialCommunityIcons name="arrow-left" size={18} color={Colors.primary} />
                <Text style={styles.back} onPress={() => navigation.goBack()}>Back</Text>
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
  },
  resetPasswordBox: {
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
  subTitle :{
    fontSize: 16,
    marginTop: -25,
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.text,
    fontFamily: "500"
  },
  backContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap:10,
    marginTop: 20
  },
  back :{
    color: Colors.background,
    fontSize: 18,
    fontWeight: "600",
    textDecorationLine: 'underline',
    marginTop: 2
  }
});

export default ResetPasswordScreen;
