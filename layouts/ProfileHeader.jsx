import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../utils/Colors';

const ProfileHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}Edit profile</Text>
        <View style={{ width: 24 }} />
      </View>
      <LinearGradient
        colors={['#00000022', '#00000000']}
        style={styles.bottomBorder}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.background, // Dark navy background (as seen in the image)
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    shadowColor:Colors.success,
    elevation:10
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomBorder: {
    height: 2,
    width: '100%',
  },
});

export default ProfileHeader;
