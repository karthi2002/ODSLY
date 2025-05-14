import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../utils/Colors';

const AVATAR_SIZE = 120;
const BORDER_WIDTH = 3;

const ProfileDisplay = ({ avatar, name, joinedDate }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ff007f', '#7928CA']}
        style={styles.avatarBorder}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </View>
      </LinearGradient>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.joinedText}>Betting since {joinedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarBorder: {
    width: AVATAR_SIZE + BORDER_WIDTH * 2,
    height: AVATAR_SIZE + BORDER_WIDTH * 2,
    borderRadius: (AVATAR_SIZE + BORDER_WIDTH * 2) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
    backgroundColor: Colors.background, // fallback background
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
