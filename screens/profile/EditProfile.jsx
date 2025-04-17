import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ProfileTextInputField from '../../components/Input/ProfileTextInputField';
import ProfileEmailInputField from '../../components/Input/ProfileEmailInputField';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../utils/Colors';

const EditProfile = ({ username, setUsername, email, setEmail }) => {
  const [imageUri, setImageUri] = useState(null);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Row for profile image + username welcome */}
    <View style={styles.content}>
    <View style={styles.row}>
        <TouchableOpacity style={styles.imageWrapper} onPress={handleImagePick}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person" size={60} color={Colors.secondary} />
          )}
        </TouchableOpacity>

        <View style={styles.textWrapper}>
          <Text style={styles.welcomeText}>Welcome, {username || 'User'}!</Text>

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
        </View>
      </View>

      {/* Username and Email Input Fields */}
      <View>
        <ProfileTextInputField
          label="Username"
          value={username}
          setValue={setUsername}
          pattern="^[a-zA-Z0-9_]{3,15}$"
          errorMessage="Username must be 3-15 characters (letters, numbers, or _)"
        />

        <Text style={styles.subText}>*Change username to check if it is available</Text>

        <ProfileEmailInputField
          label="Email"
          value={email}
          setValue={setEmail}
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          errorMessage="Please enter a valid email address"
        />
      </View>

    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.background,
    },
    content: {
    alignItems: 'stretch',
    paddingVertical: 20,
    gap: 10,
    margin: 20,
    backgroundColor: Colors.background,
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
    borderColor: Colors.secondary,
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
    color: Colors.secondary,
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
});

export default EditProfile;