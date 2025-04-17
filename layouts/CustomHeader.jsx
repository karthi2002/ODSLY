import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../utils/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({title}) => {
      const navigation = useNavigation();
    
  return (
    <View style={styles.container}>
      <View style={styles.HeaderContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color={Colors.secondary} />
        </TouchableOpacity>
        <Text style={styles.HeaderText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 60,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 10,
    zIndex: 100,
    elevation: 4,
    shadowColor: Colors.secondary,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation:10
  },
  HeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10, 
  },
  HeaderText: {
    color: Colors.secondary,
    fontSize: 22,
    fontWeight: "600",
    textTransform: "capitalize",
  }
});

export default CustomHeader;