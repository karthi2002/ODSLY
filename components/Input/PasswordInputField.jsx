import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Colors from '../../utils/Colors';

const PasswordInputField = ({
  label,
  value,
  setValue,
  pattern,
  errorMessage,
  isPassword = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');
  const [secureText, setSecureText] = useState(isPassword);

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

      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, isFocused && styles.inputFocused]}
          placeholder={isFocused ? '' : label}
          value={value}
          onChangeText={(text) => {
            setValue(text);
            if (error) setError('');
          }}
          secureTextEntry={secureText}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
        />

        {isPassword && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setSecureText(!secureText)}
          >
            <Feather name={secureText ? 'eye-off' : 'eye'} size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    paddingRight: 40,
  },
  inputFocused: {
    borderColor: Colors.primary,
  },
  icon: {
    position: 'absolute',
    right: 12,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default PasswordInputField;
