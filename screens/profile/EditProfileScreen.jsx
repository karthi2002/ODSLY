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
import TextInputField from '../../components/Input/TextInputField';
import GradientButton from '../../components/Button/GradientButton';
import Colors from '../../utils/Colors';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient'; // ✅ Use expo version

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
    console.log('Saving:', { username, email, imageUri });
  };

  const GradientText = ({ text }) => (
    <MaskedView
      maskElement={
        <View style={styles.maskContainer}>
          <Text style={styles.actionText}>{text}</Text>
        </View>
      }
    >
      <LinearGradient
        colors={['#029EFE', '#6945E2', '#E9098E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[styles.actionText, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );

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
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity onPress={handleImagePick}>
            <GradientText text="Replace" />
          </TouchableOpacity>
          <Text style={styles.separator}>|</Text>
          <TouchableOpacity onPress={() => setImageUri(null)}>
            <GradientText text="Delete" />
          </TouchableOpacity>
        </View>

        <TextInputField
          label="Username"
          value={username}
          setValue={setUsername}
          pattern="^[a-zA-Z0-9_]{3,15}$"
          errorMessage="Username must be 3-15 characters (letters, numbers, or _)"
        />

        <Text style={styles.subText}>Change username to check if it is available</Text>

        <TextInputField
          label="Email"
          value={email}
          setValue={setEmail}
          pattern="^([^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+)$"
          errorMessage="Invalid"
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
    flexDirection: 'row',
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
    marginLeft: 50,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 20,
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
  maskContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
});

export default EditProfileScreen;
