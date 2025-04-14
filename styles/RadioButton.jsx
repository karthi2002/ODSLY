import React from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '../utils/Colors'

const RadioButton = () => {
  return (
    <View style={styles.outer}>
        <View style={styles.inner}>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    outer: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderRadius: 50,
        padding: 5,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: "#3A3162",  
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner: {
        width: 10,
        height: 10,
        borderRadius: 50,
        padding: 4,
        backgroundColor: 'transparent',
        borderWidth: 4,
        borderColor: Colors.secondary
    }
})

export default RadioButton