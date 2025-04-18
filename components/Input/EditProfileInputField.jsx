import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '../../utils/Colors';

const EditProfileInputField = ({
  label,
  value,
  setValue,
  pattern,
  errorMessage,
  showValidation = false,
}) => {
  const [error, setError] = useState('');

  useEffect(() => {
    if (showValidation && value !== '') {
      const isValid = new RegExp(pattern).test(value);
      setError(isValid ? '' : errorMessage);
    } else {
      setError('');
    }
  }, [value, showValidation]);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : styles.inputNormal,
        ]}
        value={value}
        onChangeText={setValue}
        placeholder={`Enter ${label}`}
        placeholderTextColor={Colors.secondary + '99'}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: Colors.secondary,
  },
  input: {
    height: 45,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: Colors.secondary,
    backgroundColor: Colors.background,
  },
  inputNormal: {
    borderColor: Colors.secondary,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    marginTop: 4,
    color: 'red',
    fontSize: 12,
  },
});

export default EditProfileInputField;
