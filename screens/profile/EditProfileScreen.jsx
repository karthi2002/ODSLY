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
import Colors from '../../utils/Colors';
import CustomHeader from '../../layouts/CustomHeader';
import TextInputField from '../../components/Input/TextInputField';
import GradientButton from '../../components/Button/GradientButton';
import GradientField from '../../components/Input/GradientField';
import GradientToggle from '../../components/Input/GradientToggle';

const EditProfile = () => {
  const [username, setUsername] = useState(" ")
  const [email, setEmail] = useState(" ")
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
        <CustomHeader title={"Edit Profile"} />
      {/* Row for profile image + username welcome */}
    <ScrollView
            style={styles.content}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false} >
    
      {/* Username and Email Input Fields */}
      <View>
        <TextInputField
          label="Username"
          value={username}
          setValue={setUsername}
          pattern="^[a-zA-Z0-9_]{3,15}$"
          errorMessage="Username must be 3-15 characters (letters, numbers, or _)"
          style={{backgroundColor: Colors.background, borderColor: Colors.secondary , color: Colors.secondary}}
        />

        <Text style={styles.subText}>Change username to check if it is available</Text>

        <TextInputField
          label="Email"
          value={email}
          setValue={setEmail}
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          errorMessage="Please enter a valid email address"
          style={{backgroundColor: Colors.background, borderColor: Colors.secondary , color: Colors.secondary}}
        />
      </View>

      <GradientField label="FanDuel" status showIcons="double" />
      <GradientField label="Drafting" showIcons="external" />
      
      <GradientToggle label="Bet status changes" style={{backgroundColor: '#1E2A5C'}} />


      <GradientButton
        label="Save Changes"
        onPress={() => handleNavigate(item.route)}
        arrowEnable={false}
      />

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
  subText: {
    fontSize: 12,
    color: Colors.secondary,
    marginBottom: 25
  },
});

export default EditProfile;