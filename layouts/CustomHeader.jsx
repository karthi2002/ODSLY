import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../utils/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const CustomHeader = ({ title, showPostButton = false, postButtonActive = false, onPostPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.HeaderContainer}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color={Colors.secondary} />
        </TouchableOpacity>
        <Text style={styles.HeaderText}>{title}</Text>
      </View>
        {showPostButton && (
          postButtonActive ? (
            <TouchableOpacity onPress={onPostPress}>
              <LinearGradient
                colors={['#029EFE', '#6945E2', '#E9098E']}
                locations={[0, 0.37, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.activePostButton}
              >
                <Text style={styles.postText}>POST</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <View style={styles.inactivePostButton}>
              <Text style={styles.postText}>POST</Text>
            </View>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 60,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 10,
    zIndex: 100,
    elevation: 10,
    shadowColor: Colors.secondary,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  HeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  HeaderText: {
    color: Colors.secondary,
    fontSize: 22,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  activePostButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  inactivePostButton: {
    backgroundColor: '#888',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  postText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default CustomHeader;
