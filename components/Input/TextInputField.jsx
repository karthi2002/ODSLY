import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Colors from '../../utils/Colors';

const TextInputField = ({
  label,
  value,
  setValue,
  pattern,
  errorMessage,
  isValid,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localError, setLocalError] = useState('');

  const validateInput = (text) => {
    if (pattern && text !== '' && !new RegExp(pattern).test(text)) {
      setLocalError('Invaild');
    } else {
      setLocalError('');
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!errorMessage && value !== '') {
      validateInput(value);
    }
  };

  const hasError = (errorMessage || localError) && value !== '';

  return (
    <View style={styles.container}>
      {(isFocused || value) && (
        <Text style={[styles.label, style]}>{label}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          hasError && styles.errorInput,
          isValid && !hasError && styles.validInput,
          style,
        ]}
        placeholder={isFocused ? '' : label}
        value={value}
        onChangeText={(text) => {
          setValue(text);
          if (!errorMessage) {
            validateInput(text);
          }
          if (localError && text !== '') {
            setLocalError('');
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        autoCapitalize="none"
      />

      {hasError ? (
        <Text style={styles.errorText}>{errorMessage || localError}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    marginVertical: 10,
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
  errorInput: {
    borderColor: Colors.error,
  },
  validInput: {
    borderColor: Colors.success,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default TextInputField;