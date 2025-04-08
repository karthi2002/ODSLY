import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../utils/Colors'

const Copyright = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.copy}>Copyrights &copy; 2025. All rights reserved.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 12,
  },
  copy: {
    fontSize: 14,
    fontWeight: 300,
    textAlign: 'center',
    color: Colors.text
  }
})
export default Copyright