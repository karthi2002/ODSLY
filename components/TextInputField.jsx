import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Colors from '../utils/Colors';

const TextInputField = ({
  label,
  value,
  setValue,
  pattern,
  errorMessage,
}) => {
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
      {(isFocused || value) && (
        <Text style={styles.label}>{label}</Text>
      )}

      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        placeholder={isFocused ? '' : label}
        value={value}
        onChangeText={(text) => {
          setValue(text);
          if (error) setError('');
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
      />
      {error && value ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    margin: 10,
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 4,
    fontSize: 14,
    color: Colors.text,
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.LightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: Colors.primary,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default TextInputField;
