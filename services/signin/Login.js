import axios from "axios";
import { Alert } from "react-native";
import { BACKEND_URL } from "../../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const handleLogin = async ({ emailOrPhone, password, navigation, setEmailError, setPasswordError, }) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/login`, {
      emailOrPhone,
      password
    });

    const data = response.data;

    if (response.status === 200) {
      if (data.profileSetupRequired) {
        navigation.navigate("SetupProfile", { email: data.user.email });
      } else {
        await AsyncStorage.setItem("userSession", JSON.stringify(data.user));
        await AsyncStorage.setItem("authToken", data.token);
      }
    }
  } catch (error) {
    setEmailError("");
    setPasswordError("");
    if (error.response) {
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
