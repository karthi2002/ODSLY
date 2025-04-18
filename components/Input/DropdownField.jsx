import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../utils/Colors';

const screenHeight = Dimensions.get('window').height;

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
        animationType="slide"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.fullscreenModal}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Select {label}</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Ionicons name="close" size={28} color={Colors.secondary} />
            </TouchableOpacity>
          </View>

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
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>
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
  placeholderText: {
    color: Colors.secondary + '99',
  },
  fullscreenModal: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  option: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary + '22',
  },
  optionText: {
    fontSize: 16,
    color: Colors.secondary,
  },
});

export default DropdownField;
