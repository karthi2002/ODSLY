import axios from "axios";
import { Alert } from "react-native";
import { BACKEND_URL } from "../../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setSession } from "../../redux/session/sessionSlice";
import { store } from "../../redux/store";

export const handleLogin = async ({
  emailOrPhone,
  password,
  navigation,
  setEmailError,
  setPasswordError,
  dispatch,
}) => {
  try {
    if (!setSession) {
      throw new Error("setSession is undefined. Check import from sessionSlice.");
    }
    console.log('handleLogin: Sending login request', { emailOrPhone, password: '[hidden]' });
    const response = await axios.post(`${BACKEND_URL}/api/v1/login`, {
      emailOrPhone,
      password,
    });

    const { user, token, profileSetupRequired } = response.data;
    console.log('handleLogin: Login response', { user, token, profileSetupRequired });

    if (response.status === 200) {
      if (profileSetupRequired) {
        console.log('handleLogin: Navigating to SetupProfile', { email: user.email });
        navigation.navigate("SetupProfile", { email: user.email });
      } else {
        const userSession = { email: user.email };
        console.log('handleLogin: Setting userSession', userSession);
        await AsyncStorage.setItem("userSession", JSON.stringify(userSession));
        console.log('handleLogin: Stored userSession in AsyncStorage');
        await AsyncStorage.setItem("authToken", token);
        console.log('handleLogin: Stored authToken', token);
        dispatch(setSession(userSession));
        console.log('handleLogin: Dispatched setSession');
        // Verify Redux state
        const reduxState = store.getState().session;
        console.log('handleLogin: Redux state after dispatch', reduxState);
        if (!reduxState.userSession?.email) {
          throw new Error('Failed to set userSession in Redux');
        }
        navigation.navigate("MainTab");
        console.log('handleLogin: Navigated to MainTab');
      }
    }
  } catch (error) {
    setEmailError("");
    setPasswordError("");
    console.error('handleLogin: Error', error.message, error.response?.data);
    if (error.message.includes("setSession is undefined")) {
      console.error("Import Error:", error.message);
      Alert.alert("Error", "Session setup failed. Contact support.");
    } else if (error.message.includes("Failed to set userSession in Redux")) {
      Alert.alert("Error", "Session setup failed. Please try again.");
    } else if (error.response) {
      const { error: errMsg } = error.response.data;
      if (errMsg === "invalid_user") {
        setEmailError("Invalid");
      } else if (errMsg === "invalid_password") {
        setPasswordError("Incorrect password");
      } else if (errMsg === "server_error") {
        Alert.alert("Login Failed", "Server error. Please try again later.");
      } else {
        Alert.alert("Login Failed", "Unknown error occurred.");
      }
    } else {
      console.error("Login error:", error.message);
      Alert.alert("Error", "Server not reachable");
    }
  }
};