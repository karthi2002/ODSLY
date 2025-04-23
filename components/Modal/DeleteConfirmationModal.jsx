import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Colors from '../../utils/Colors';

const DeleteConfirmationModal = ({
  isVisible,
  onCancel,
  onConfirm,
  message = "Are you sure you want to delete this comment?",
}) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={1}
      customBackdrop={
        <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />
      }
      animationIn="zoomIn"
      animationOut="zoomOut"
      useNativeDriver
    >
      <View style={styles.modalContainer}>
        <View style={styles.iconWrapper}>
          <Image
            source={require('../../assets/images/delete-icon.png')}
            style={styles.icon}
          />
        </View>
        <Text style={styles.message}>{message}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onConfirm} style={styles.confirmWrapper}>
            <LinearGradient
                colors={['#029EFE', '#6945E2', '#E9098E']}
              locations={[0, 0.37, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmText}>Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmationModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  message: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#2f80ed',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  cancelText: {
    color: '#2f80ed',
    fontSize: 14,
    fontWeight: '500',
  },
  confirmWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  confirmButton: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 20,
  },
  confirmText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
