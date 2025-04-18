import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../utils/Colors';
import CustomHeader from '../../layouts/CustomHeader';
import GradientButton from '../../components/Button/GradientButton';
import GradientToggle from '../../components/Input/GradientToggle';
import { notificationSettings } from '../../json/ProfileData';

const NotificationSettingScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState('Push');

  return (
    <View style={styles.container}>
      <CustomHeader title={"Notifications Settings"} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Delivery Method:</Text>
        <View style={styles.deliveryRow}>
          {['Push', 'Email', 'In-app only'].map((method) => (
            <TouchableOpacity
              key={method}
              style={[
                styles.deliveryBtn,
                selectedMethod === method && styles.deliveryBtnSelected,
              ]}
              onPress={() => setSelectedMethod(method)}
            >
              <Text
                style={[
                  styles.deliveryBtnText,
                  selectedMethod === method && styles.deliveryBtnTextSelected,
                ]}
              >
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.heading}>Notification:</Text>
        <View style={styles.toggleList}>
          {notificationSettings.map((item, index) => (
            <GradientToggle
              key={index}
              label={item.label}
              style={{ backgroundColor: '#1E2A5C' }}
            />
          ))}
        </View>

        <GradientButton
          label="Save Changes"
          onPress={() => console.log('Save button pressed')}
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
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 15,
    marginTop: 15,
  },
  deliveryRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  deliveryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.LightGray,
    borderRadius: 20,
  },
  deliveryBtnSelected: {
    backgroundColor: Colors.blue,
  },
  deliveryBtnText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary,
    textAlign: 'center',
  },
  deliveryBtnTextSelected: {
    color: Colors.secondary,
  },
  toggleList: {
    gap: 12,
  },
});

export default NotificationSettingScreen;
