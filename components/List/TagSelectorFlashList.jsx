import React from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import Colors from "../../utils/Colors";

const sportsList = [
  "Cricket 🏏",
  "Soccer ⚽",
  "Badminton 🏸",
  "Judo 🥋",
  "Basketball 🏀",
  "Golf ⛳",
  "Tennis 🎾",
  "Baseball ⚾",
  "Rugby 🏉",
  "Hockey 🏒",
];

const TagSelectorFlashList = ({ selectedTags, setSelectedTags }) => {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedTags.includes(item);
    return (
      <Pressable
        onPress={() => toggleTag(item)}
        style={[
          styles.tag,
          { backgroundColor: isSelected ? Colors.primary : Colors.lightGray },
        ]}
      >
        <Text
          style={{
            color: isSelected ? "#fff" : Colors.text,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {item}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select your favourite Sports</Text>
      <FlatList
        data={sportsList}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.background,
    marginBottom: 15,
    textAlign: "center",
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1.5, 
    borderColor: Colors.blue, 
    backgroundColor: "transparent", 
  },
});

export default TagSelectorFlashList;
