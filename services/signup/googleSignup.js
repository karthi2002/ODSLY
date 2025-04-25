import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { Alert } from 'react-native';

export const handleGoogleSignup = async (navigation) => {
  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);
    const user = userCredential.user;

    const response = await axios.get(
      `http://your-server-url/api/v1/googleSignup?email=${user.email}`
    );

    if (response.data.otpSent) {
      Alert.alert("User Exists", "Redirecting to OTP verification.");
      navigation.navigate('VerifyOTP', { email: user.email });
    } else {
      Alert.alert("New Signup", "Registered successfully.");
      navigation.navigate('VerifyOTP', { email: user.email });
    }

  } catch (error) {
    console.log(error);
    Alert.alert("Authentication Error", "Google sign-in failed.");
  }
};
