import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { Alert } from 'react-native';
import { BACKEND_URL } from '../../config/url';

export const handleGoogleSignup = async (navigation) => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
  
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const user = userCredential.user;
  
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/googleSignup?email=${user.email}`
      );
  
      const { otpSent, userExists } = response.data;
  
      if (userExists) {
        Alert.alert("User Already Exists", "Redirecting to Sign In.");
        navigation.navigate("SignIn", { email: user.email });
      } else if (otpSent) {
        Alert.alert("OTP Sent", "Please check your email.");
        navigation.navigate("VerifyOTP", { email: user.email });
      }
  
    } catch (error) {
      console.error(error);
      Alert.alert("Authentication Error", "Google sign-in failed.");
    }
  };
  