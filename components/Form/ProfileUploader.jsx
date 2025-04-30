import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import TextInputField from '../Input/TextInputField';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Colors from '../../utils/Colors';
import { BACKEND_URL } from '../../config/url';


const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dmpx9rrm4/image/upload'; 
const CLOUDINARY_UPLOAD_PRESET = 'odsly_profile';

const ProfileUploader = ({ username, setUsername }) => {
  const [imageUri, setImageUri] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [usernameAvailable, setUsernameAvailable] = React.useState(null);
const [typingTimeout, setTypingTimeout] = React.useState(null);


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
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
  
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: `image/${fileType}`,
        name: `upload.${fileType}`,
      });
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  
      const response = await axios.post(CLOUDINARY_URL, formData, {
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
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const checkUsernameAvailability = async (name) => {
    if (!name || name.length < 3) return;
  
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/check-user`, { username: name });
      setUsernameAvailable(!response.data.exists);
    } catch (err) {
      console.error("Username check error:", err);
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
            <Ionicons name="person" size={40} style={styles.iconImage} color={Colors.background} />
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
          setValue={(val) => {
            setUsername(val);
            if (typingTimeout) clearTimeout(typingTimeout);
            const timeout = setTimeout(() => {
              checkUsernameAvailability(val);
            }, 500); 
            setTypingTimeout(timeout);
          }}
          pattern="^[a-zA-Z0-9_]{3,15}$"
          errorMessage="Username must be 3-15 characters (letters, numbers, or _)"
        />
        
        {username.length >= 3 && (
          <Text style={{ fontSize: 12, color: usernameAvailable === false ? 'red' : 'green' }}>
            {usernameAvailable === false
              ? 'Username is already taken'
              : usernameAvailable === true
              ? 'Username is available'
              : ''}
          </Text>
        )}

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
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
    borderRadius: 50,
    padding: 2
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 5,
    numberOfLines: 1,
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
