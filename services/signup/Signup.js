import axios from "axios";
import { Alert } from "react-native";
import { BACKEND_URL } from "../../config/url";


export const handleSignup = async (fullName, emailOrPhone, password, navigation) => {
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
    if (error.response && error.response.status === 400 && error.response.data.userExists) {
      Alert.alert(error.response.data.message);
      navigation.navigate('SignIn', { email: emailOrPhone });
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
