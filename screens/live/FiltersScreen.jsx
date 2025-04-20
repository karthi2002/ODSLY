import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../utils/Colors";
import GradientButton from "../../components/Button/GradientButton";
import CustomHeader from "../../layouts/CustomHeader";
import GradientCheckbox from "../../components/Input/GradientCheckbox";
import { sportsbookFilter, DFSFilter } from "../../json/Filters";
import GradientBorderButton from "../../components/Button/GradientBorderButton";

const { width } = Dimensions.get("window");

const FiltersScreen = () => {
  const navigation = useNavigation();

  const [sportsbookSelections, setSportsbookSelections] = useState(
    sportsbookFilter.map((item) => ({ ...item }))
  );
  
  const [dfsSelections, setDfsSelections] = useState(
    DFSFilter.map((item) => ({ ...item }))
  );
  

  const toggleSelection = (type, index) => {
    const updateSelections = (data) =>
      data.map((item, i) =>
        i === index ? { ...item, selected: !item.selected } : item
      );

    if (type === "sportsbook") {
      setSportsbookSelections(updateSelections(sportsbookSelections));
    } else {
      setDfsSelections(updateSelections(dfsSelections));
    }
  };

  const clearSelections = () => {
    setSportsbookSelections(sportsbookSelections.map((item) => ({ ...item, selected: false })));
    setDfsSelections(dfsSelections.map((item) => ({ ...item, selected: false })));
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={"Filters"} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bookType}>
          <Text style={styles.bookName}>Sportsbook Account</Text>
          {sportsbookSelections.map((account, index) => (
            <GradientCheckbox
              key={index}
              label={account.label}
              checked={account.selected}
              onToggle={() => toggleSelection("sportsbook", index)}
            />
          ))}
        </View>

        <View style={styles.bookType}>
          <Text style={styles.bookName}>DFS</Text>
          {dfsSelections.map((account, index) => (
            <GradientCheckbox
              key={index}
              label={account.label}
              checked={account.selected}
              onToggle={() => toggleSelection("dfs", index)}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <GradientBorderButton
            title="Clear"
            onPress={clearSelections}
            showBorderGradient={true}
            backgroundColor={Colors.background}
            textColor={Colors.secondary}
            showTextGradient={false}
            disabled={false}
            paddingVertical={12}
            style={{ width: "48%" }}
          />
          <GradientButton
            label="Apply"
            onPress={() => {}}
            arrowEnable={false}
            style={{ width: "100%" }}
          />
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
  bookName: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "600",
    color: Colors.secondary,
  },
  bookType: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginTop: 20,
  },
});

export default FiltersScreen;
