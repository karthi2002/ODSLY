import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // or any icon lib you use
import Colors from '../../utils/Colors';

const DropdownField = ({
  label,
  value,
  setValue,
  options = [],
  style
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      
    
    <Text style={[styles.label, style]}>{label}</Text>
      

      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[styles.dropdown, isFocused && styles.dropdownFocused, style]}
        activeOpacity={0.7}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <Text style={[styles.text, !value && styles.placeholderText]}>
    {value || 'Select'}
  </Text>
        <Ionicons name="chevron-down" size={20} color={Colors.secondary} />
      </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    setValue(item);
                    setVisible(false);
                    setIsFocused(true);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    marginVertical: 20,
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: Colors.background,
    paddingHorizontal: 4,
    fontSize: 14,
    color: Colors.secondary,
    zIndex: 1,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 8,
    padding: 12,
    paddingRight: 30,
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownFocused: {
    borderColor: Colors.secondary,
  },
  text: {
    fontSize: 16,
    color: Colors.secondary,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
  modalContainer: {
    backgroundColor: Colors.background,
    marginHorizontal: 40,
    borderRadius: 10,
    paddingVertical: 10,
    maxHeight: 250,
  },
  option: {
    padding: 15,
  },
  optionText: {
    fontSize: 16,
    color: Colors.secondary,
    fontWeight: '400'
  },
});

export default DropdownField;
