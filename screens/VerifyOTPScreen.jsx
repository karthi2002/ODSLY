import React, { useState } from "react";
import Colors from "../utils/Colors";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import OTPTextInput from 'react-native-otp-textinput';
import Logo from "../layouts/Logo";
import GradientButton from "../components/Button/GradientButton";
import Copyright from "../layouts/Copyright";
import { useNavigation } from '@react-navigation/native';


const VerifyOTPScreen = () => {

const navigation = useNavigation();

const [otp, setOtp] = useState('');
const [error, setError] = useState(false);

const handleResetPassword = () => {
  if (otp === '123456') {
    navigation.navigate('Login');
  } else {
    setError(true);
  }
};

  return (
    <View style={styles.container}>
      
      <Logo />

      <View style={styles.verifyOTPBox}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subTitle}>Please verify the OTP sent to your email / Phone Number</Text>
  
        {/* 6 digit otp input field */}
        <View style={styles.otpInputWrapper} >
        <OTPTextInput
            inputCount={6}
            tintColor={Colors.primary}
            offTintColor={Colors.LightGray}
            handleTextChange={(val) => {
                setOtp(val);
                if (error) setError(false);
            }}
            textInputStyle={{
                borderWidth: 1,
                borderColor: Colors.LightGray,
                borderRadius: 5,
                color: Colors.primary,
                textAlign: 'center',
                fontSize: 16,
                backgroundColor: Colors.secondary,
                width: 45,
                height: 50,
                marginHorizontal: 5, 
            }}
            />
            {error && (
                <Text style={styles.errorText}>
                Incorrect OTP Try Again
                </Text>
            )}
        </View>


        <View style={styles.resendContainer}>
            <Text style={styles.resend}>Didn't receive OTP?</Text>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>Resend OTP</Text>
                </TouchableOpacity>
            </View>
        </View>

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
    paddingVertical: 50
  },
  verifyOTPBox: {
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
  subTitle :{
    fontSize: 16,
    marginTop: -25,
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.text,
    fontFamily: "500"
  },
  otpInputWrapper: {
  alignItems: 'center',
  width: '100%',
},
errorText: {
      color: Colors.error,
      fontSize: 12,
      marginTop: 4,
    },
  resendContainer: {
    width: '100%',
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginVertical: 10
  },
  resend: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: 500,
  },
  link: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 600,
    color: Colors.background,
    textDecorationLine: "underline",
    textAlign: "right",
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

export default VerifyOTPScreen;
