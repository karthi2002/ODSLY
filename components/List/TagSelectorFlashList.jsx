import React from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import Colors from "../../utils/Colors";



const TagSelectorFlashList = ({data, selectedTags, setSelectedTags }) => {
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
          { backgroundColor: isSelected ? Colors.blue : Colors.LightGray },
        ]}
      >
        <Text
          style={{
            color: isSelected ? Colors.secondary : Colors.primary,
            fontSize: 16,
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
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "start" }}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: Colors.text,
    textAlign: 'left',
  },
  tag: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1, 
    borderColor: Colors.text,
    backgroundColor: "transparent", 
  },
});

export default TagSelectorFlashList;