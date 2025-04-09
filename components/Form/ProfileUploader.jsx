import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import TextInputField from '../Input/TextInputField'; // Update path if needed
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';


const ProfileUploader = ({ username, setUsername }) => {
  const [imageUri, setImageUri] = React.useState(null);

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
      <View style={styles.row}>
        <TouchableOpacity style={styles.imageWrapper} onPress={handleImagePick}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person" size={82} color="#000A34" />
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

      {/* Username Input Field */}
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    paddingVertical: 20,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
    width: '100%',
  },
  imageWrapper: {
    borderWidth: 2,
    borderColor: '#000A34',
    borderRadius: 60,
    padding: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  uploadText: {
  fontSize: 16,
  fontWeight: '600',
  textAlign: 'left',
},
  subText: {
    fontSize: 12,
    color: 'gray',
    fontStyle: 'italic',
    marginLeft:15,
  },
});


export default ProfileUploader;
