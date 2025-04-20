import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, VirtualizedList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import Colors from '../../utils/Colors';

export default function DollarInputField({
  label,
  value,
  setValue,
  placeholder,
  pattern,
  errorMessage,
  style
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');

  const handleBlur = () => {
    setIsFocused(false);
    if (pattern && !new RegExp(pattern).test(value)) {
      setError(errorMessage || 'Invalid input');
    } else {
      setError('');
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={[styles.label, style]}>{label}</Text>

      <View style={[styles.inputWrapper, isFocused && styles.inputFocused]}>
        <FontAwesome
          name="dollar"
          size={16}
          color={Colors.secondary}
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, style]}
          keyboardType="numeric"
          placeholder={isFocused ? '' : placeholder}
          placeholderTextColor="#888"
          value={value}
          onChangeText={(text) => {
            setValue(text);
            if (error) setError('');
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
        />
      </View>
      {error && value ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    width: '100%',
    position: 'relative',
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.secondary,
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
  },
  inputFocused: {
    borderColor: Colors.secondary,
  },
  icon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Colors.secondary,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});
