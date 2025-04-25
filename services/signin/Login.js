
import axios from "axios";
import { Alert } from "react-native";
import { BACKEND_URL } from "../../config/url";

export const handleLogin = async ({ emailOrPhone, password, navigation }) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/login`, {
      emailOrPhone,
      password
    });

    const data = response.data;

    if (response.status === 200) {
      navigation.navigate("SetupProfile", { email: data.email });
    }
  } catch (error) {
    if (error.response) {
      const { error: errMsg } = error.response.data;

      if (errMsg === "invalid_user") {
        Alert.alert("Login Failed", "User does not exist");
      } else if (errMsg === "invalid_password") {
        Alert.alert("Login Failed", "Incorrect password");
      } else {
        Alert.alert("Login Failed", "Something went wrong");
      }
    } else {
      console.error("Login error:", error.message);
      Alert.alert("Error", "Server not reachable");
    }
  }
};
