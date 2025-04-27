import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import GradientButton from '../../components/Button/GradientButton';
import GreenTick from '../../assets/images/green-tick.gif';
import Colors from '../../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const SuccessScreen = ({ navigation }) => {
  
  const handleSuccess = async () => {
    await AsyncStorage.setItem("userSession", JSON.stringify(data.user));
    await AsyncStorage.setItem("authToken", data.token);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.successText}>SUCCESS!</Text>
      <Text style={styles.subText}>
        Your Profile has been{'\n'}successfully created!
      </Text>

      <Image source={GreenTick} style={styles.gif} resizeMode="contain" />

      <View style={styles.buttonContainer}>
        <GradientButton
          label="Go to Dashboard"
          onPress={handleSuccess}
          arrowEnable={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
  },
  successText: {
    fontSize: width * 0.08, 
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: height * 0.02,
  },
  subText: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#555',
    textAlign: 'center',
    marginBottom: height * 0.04,
  },
  gif: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: height * 0.04,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
