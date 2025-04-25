import axios from "axios";
import { Alert } from "react-native";


export const handleSignup = async (fullName, emailOrPhone, password, navigation) => {
  try {
    const response = await axios.post('http://192.168.0.215:3000/api/v1/signup', {
      fullName,
      email: emailOrPhone,
      password,
    });

    if (response.data.otpSent) {
      Alert.alert('OTP Sent', 'Please check your email.');
      navigation.navigate('VerifyOTP', { email: emailOrPhone });
    } else {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  } catch (error) {
    if (error.response && error.response.status === 400 && error.response.data.userExists) {
      Alert.alert(error.response.data.message);
      navigation.navigate('SignIn', { email: emailOrPhone });
    } else {
      Alert.alert('An error occurred. Please try again.');
    }
  }
};

export const handleVerifyOTP = async (otp, email, navigation, setError) => {
  try {
    const response = await axios.post("http://192.168.0.215:3000/api/v1/verify-otp", {
      email,
      otp,
    });

    if (response.status === 200) {
      Alert.alert('Verified');
      navigation.navigate("Login");
    }
  } catch (error) {
    setError(true);
    Alert.alert("Error", error.response?.data?.message || "Something went wrong");
  }
};
