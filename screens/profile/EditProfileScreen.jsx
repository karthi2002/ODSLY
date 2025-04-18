import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomHeader from '../../layouts/CustomHeader';
import EditProfileInputField from '../../components/Input/EditProfileInputField';
import GradientButton from '../../components/Button/GradientButton';
import Colors from '../../utils/Colors';

const EditProfileScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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

  const handleSaveChanges = () => {
    // Add save logic here
    console.log('Saving:', { username, email, imageUri });
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Edit Profile" />
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={handleImagePick} style={styles.imageWrapper}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.profileImage} />
            ) : (
              <Ionicons name="person" size={60} color={Colors.background} />
            )}
          </TouchableOpacity>

          <Text style={styles.welcomeText}>Welcome, {username || 'John Doe'}!</Text>

          <View style={styles.actionRow}>
            <TouchableOpacity onPress={handleImagePick}>
              <Text style={[styles.actionText, { color: 'crimson' }]}>Replace</Text>
            </TouchableOpacity>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity onPress={() => setImageUri(null)}>
              <Text style={[styles.actionText, { color: 'crimson' }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>

        <EditProfileInputField
          label="Username"
          value={username}
          setValue={setUsername}
          pattern="^[a-zA-Z0-9_]{3,15}$"
          errorMessage="Username must be 3–15 characters (letters, numbers, or _)"
          showValidation={true}
        />

        <Text style={styles.subText}>Change username to check if it is available</Text>

        <EditProfileInputField
          label="Email"
          value={email}
          setValue={setEmail}
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          errorMessage="Please enter a valid email address"
          showValidation={true}
        />

        <GradientButton label="Save Changes" onPress={handleSaveChanges} arrowEnable={false} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingTop: 80,
    paddingHorizontal: 15,
  },
  profileContainer: {
    flexDirection:'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginLeft:50,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  actionText: {
    fontSize: 14,
    color: Colors.primary,
  },
  separator: {
    marginHorizontal: 8,
    fontSize: 14,
    color: Colors.secondary,
  },
  subText: {
    fontSize: 12,
    color: Colors.secondary,
    marginBottom: 20,
  },
});

export default EditProfileScreen;
