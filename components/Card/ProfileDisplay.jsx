import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import Colors from '../../utils/Colors';

const ProfileDisplay = ({ avatar, name, joinedDate }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ff007f', '#7928CA']}
        style={styles.avatarBorder}
      >
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </LinearGradient>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.joinedText}>Betting since {joinedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20
  },
  avatarBorder: {
    padding: 2,
    borderRadius: '50%',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  name: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.secondary,
  },
  joinedText: {
    fontSize: 16,
    color: Colors.text,
    marginTop: 4,
  },
});

export default ProfileDisplay;
