import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../utils/Colors";
import GradientButton from "../../components/Button/GradientButton";
import CustomHeader from "../../layouts/CustomHeader";
import GradientField from "../../components/Input/GradientField";
import { SportsbookAccountData, DFSAccountData } from "../../json/SportsbookAccountData";

const SportsBookScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CustomHeader title={"Sportsbook Account"} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
      <View style={styles.bookType}>
      <Text style={styles.bookName}>SportsBook</Text>
      {SportsbookAccountData.map((account, index) => (
        <GradientField
          key={index}
          label={account.label}
          status={account.status}
          showIcons={account.showIcons}
        />
      ))}
      </View>
      <View style={styles.bookType}>
      <Text style={styles.bookName}>DFS</Text>
      {DFSAccountData.map((account, index) => (
        <GradientField
          key={index}
          label={account.label}
          status={account.status}
          showIcons={account.showIcons}
        />
      ))}
      </View>

       
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
});

export default SportsBookScreen;
