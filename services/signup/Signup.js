import axios from "axios";
import { Alert } from "react-native";
import { BACKEND_URL } from "../../config/url";

export const handleSignup = async (
  fullName,
  emailOrPhone,
  password,
  navigation,
  { setFullNameError, setEmailError, setPasswordError, setConfirmPasswordError }
) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      fullName,
      email: emailOrPhone,
      password,
    });

    if (response.data.otpSent) {
      Alert.alert('OTP Sent', 'Please check your email.');
      navigation.navigate('VerifyOTP', { email: emailOrPhone, flow: 'Signup' });
    } else {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  } catch (error) {
    setFullNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    if (error.response) {
      const { userExists, message } = error.response.data;
      if (error.response.status === 400 && userExists) {
        setEmailError("Already registered");
        navigation.navigate('SignIn', { email: emailOrPhone });
      } else if (message === "Invalid full name") {
        setFullNameError("Invalid full name format");
        Alert.alert('Error', message);
      } else if (message === "Invalid password") {
        setPasswordError("Invalid password format");
        Alert.alert('Error', message);
      } else {
        Alert.alert('Error', message || 'Something went wrong. Please try again.');
      }
    } else {
      console.error("Signup error:", error.message);
      Alert.alert('Error', 'Server not reachable');
    }
  }
};


export const handleVerifyOTP = async (otp, email, navigation, setError, flow) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/verify-otp`, {
      email,
      otp,
      flow,
    });

    if (response.status === 200) {
      if (flow === 'Forgot' && response.data.resetPassword) {
        Alert.alert('OTP Verified', 'You can now reset your password.');
        navigation.navigate('ResetPassword', { email });
      } else {
        Alert.alert('Verified');
        navigation.navigate('Login');
      }
    }
  } catch (error) {
    setError(true);
    Alert.alert("Error", error.response?.data?.message || "Something went wrong");
  }
};
