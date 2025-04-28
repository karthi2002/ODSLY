import axios from 'axios';
import { Alert } from 'react-native';
import { BACKEND_URL } from '../../config/url';

export const handleForgot = async (emailOrPhone, navigation, setError) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/forgot-password`, {
      emailOrPhone
    });

    if (response.data.message === 'OTP sent successfully') {
      Alert.alert('OTP Sent', 'Please check your email.');
      navigation.navigate('VerifyOTP', { email: emailOrPhone, flow: 'Forgot' });
    } else {
      setError("This Email ID / Phone Number is not registered"); 
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Error', error.response?.data?.message || 'An error occurred');
  }
};

export const handleResetPassword = async (
  email,
  password,
  confirmPassword,
  navigation,
  setError
) => {
  console.log('hello')
  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/resetPassword`, 
      { email, newPassword: password }
    );

    if (response.data.message === "Password reset successfully") {
      navigation.navigate("Login");
    } else {
      Alert.alert('Error', response.data.message);
    }
  } catch (error) {
    Alert.alert('Error', error.response?.data?.message || 'An error occurred');
  }
};
