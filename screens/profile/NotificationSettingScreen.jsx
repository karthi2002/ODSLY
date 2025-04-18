import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Colors from '../../utils/Colors';
import CustomHeader from '../../layouts/CustomHeader';
import GradientButton from '../../components/Button/GradientButton';
import GradientToggle from '../../components/Input/GradientToggle';

const NotificationSettingScreen = () => {


  return (
    <View style={styles.container}>
        <CustomHeader title={"Notifications Settings"} />

    <ScrollView
            style={styles.content}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false} >
    
     

      <GradientButton
        label="Save Changes"
        onPress={() => handleNavigate(item.route)}
        arrowEnable={false}
      />

    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingTop: 80,
    paddingHorizontal: 15,
  },
});

export default NotificationSettingScreen;