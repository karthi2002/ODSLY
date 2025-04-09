import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DotsLoader } from 'react-native-loading-dots';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const ProfileLoadingIndicator = () => {
  return (
    <View style={styles.container}>
      {/* Dot Loader */}
      <DotsLoader
        size={12}
        betweenSpace={12}
        color="#000A34"
        dotsNumber={4}
      />

      {/* Gradient Text Below */}
      <MaskedView
        style={{ marginTop: 16 }}
        maskElement={
          <Text style={styles.gradientText}>
            Creating your Profile..
          </Text>
        }
      >
        <LinearGradient
          colors={['#029EFE', '#6945E2', '#E9098E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.gradientText, { opacity: 0 }]}>
            Creating your Profile..
          </Text>
        </LinearGradient>
      </MaskedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ProfileLoadingIndicator;
