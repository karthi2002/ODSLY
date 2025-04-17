import React, { useState, useCallback } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../utils/Colors';

const ProfileTextInputField = ({
  label,
  value,
  setValue,
  pattern,
  errorMessage = 'Invalid input',
  secureTextEntry = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');

  const handleBlur = () => {
    setIsFocused(false);
    if (pattern && value && !new RegExp(pattern).test(value)) {
      setError(errorMessage);
    } else {
      setError('');
    }
  };

  const handleChangeText = useCallback(
    (text) => {
      setValue(text);
      if (!text || (pattern && new RegExp(pattern).test(text))) {
        setError('');
      }
    },
    [setValue, pattern]
  );

  return (
    <View style={styles.container}>
      {(isFocused || value) && (
        <Text style={styles.label}>{label}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && value && styles.inputError,
        ]}
        placeholder={isFocused ? '' : label}
        value={value}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        keyboardType="default"
        secureTextEntry={secureTextEntry}
        accessible={true}
        accessibilityLabel={label}
        accessibilityHint={error || `Enter ${label.toLowerCase()}`}
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
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});

ProfileTextInputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  pattern: PropTypes.string,
  errorMessage: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

export default ProfileTextInputField;