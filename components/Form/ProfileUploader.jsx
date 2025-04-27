import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import TextInputField from '../Input/TextInputField';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Colors from '../../utils/Colors';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dmpx9rrm4/image/upload'; 
const CLOUDINARY_UPLOAD_PRESET = 'odsly';

const ProfileUploader = ({ username, setUsername }) => {
  const [imageUri, setImageUri] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(null);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImageUri(result.assets[0].uri);
      uploadImageToCloudinary(result.assets[0].uri);
    }
  };

  const handleImageRemove = () => {
    setImageUri(null);
    setImageUrl(null);
  };

  const uploadImageToCloudinary = async (uri) => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append('file', {
        uri,
        type: 'image/jpeg', 
        name: 'profile_picture.jpg',
      });
      data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const response = await axios.post(CLOUDINARY_URL, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setImageUrl(response.data.secure_url);
        Alert.alert('Image Upload', 'Profile picture uploaded successfully!');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Row */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.imageWrapper} onPress={handleImagePick}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person" size={60} color={Colors.background} />
          )}
        </TouchableOpacity>

        <View style={styles.textWrapper}>
          <Text style={styles.welcomeText}>Welcome, {username || 'User'}!</Text>

          {imageUri ? (
            <View style={styles.actionRow}>
              <TouchableOpacity onPress={handleImagePick}>
                <GradientText text="Replace" />
              </TouchableOpacity>
              <Text style={styles.separator}>|</Text>
              <TouchableOpacity onPress={handleImageRemove}>
                <GradientText text="Delete" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={handleImagePick}>
              <MaskedView maskElement={<Text style={styles.uploadText}>Upload Profile Picture</Text>}>
                <LinearGradient
                  colors={['#029EFE', '#6945E2', '#E9098E']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={[styles.uploadText, { opacity: 0 }]}>Upload Profile Picture</Text>
                </LinearGradient>
              </MaskedView>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Username Input */}
      <View>
        <TextInputField
          label="Username"
          value={username}
          setValue={setUsername}
          pattern="^[a-zA-Z0-9_]{3,15}$"
          errorMessage="Username must be 3-15 characters (letters, numbers, or _)"
        />
        <Text style={styles.subText}>
          *Unique username that will represent your identity
        </Text>
      </View>
    </View>
  );
};

// GradientText Component
const GradientText = ({ text }) => (
  <MaskedView
    maskElement={
      <View style={styles.maskContainer}>
        <Text style={styles.actionText}>{text}</Text>
      </View>
    }
  >
    <LinearGradient
      colors={["#029EFE", "#6945E2", "#E9098E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Text style={[styles.actionText, { opacity: 0 }]}>{text}</Text>
    </LinearGradient>
  </MaskedView>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    paddingVertical: 20,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 15,
    width: '100%',
  },
  imageWrapper: {
    borderWidth: 2,
    borderColor: Colors.background,
    borderRadius: 60,
    padding: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 5,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
  },
  subText: {
    fontSize: 12,
    color: 'gray',
    fontStyle: 'italic',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  separator: {
    fontSize: 16,
    color: Colors.primary,
  },
  maskContainer: {
    backgroundColor: 'transparent',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileUploader;
