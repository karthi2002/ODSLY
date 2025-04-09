import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

const TagSelectorFlashList = ({
  data,
  onSelect,
  selectedTags = [],
  numColumns = 2,
  tagStyle = {},
  selectedTagStyle = {},
  textStyle = {},
  selectedTextStyle = {},
}) => {
  const handleSelect = (item) => {
    const updatedSelection = selectedTags.includes(item)
      ? selectedTags.filter((tag) => tag !== item)
      : [...selectedTags, item];
    onSelect(updatedSelection);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedTags.includes(item);

    return (
      <TouchableOpacity
        style={[
          styles.tag,
          tagStyle,
          isSelected && [styles.selectedTag, selectedTagStyle],
        ]}
        onPress={() => handleSelect(item)}
      >
        <Text
          style={[
            styles.tagText,
            textStyle,
            isSelected && [styles.selectedTagText, selectedTextStyle],
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlashList
      data={data}
      estimatedItemSize={80}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item}-${index}`}
      numColumns={numColumns}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tag: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    backgroundColor: '#F7F8FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTag: {
    backgroundColor: '#E0E7FF',
    borderColor: '#4F46E5',
  },
  tagText: {
    fontSize: 14,
    color: '#1F2937',
  },
  selectedTagText: {
    color: '#4F46E5',
    fontWeight: '600',
  },
});

export default TagSelectorFlashList;
