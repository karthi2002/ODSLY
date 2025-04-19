import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import GradientButton from '../../components/Button/GradientButton'; 
import GreenTick from '../../assets/images/green-tick.gif';

const SuccessScreen = ({ navigation }) => {
  
  const handleSuccess = () => {
    navigation.navigate('MainTab');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>SUCCESS!</Text>
      <Text style={styles.subText}>Your Profile has been{'\n'}successfully created!</Text>

      <Image
        source={GreenTick} 
        style={styles.gif}
        resizeMode="contain"
      />

 
      <View style={styles.buttonContainer}>
        <GradientButton
          label="Go to Dashboard"
          onPress={handleSuccess}
          arrowEnable={true}
        />
      </View>
    </View>
  );
};

export default SuccessScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  successText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0F1333',
    marginBottom: 20,
  },
  subText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  gif: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  buttonContainer: {
    width: width * 0.8,
    marginTop: 10,
  },
});
