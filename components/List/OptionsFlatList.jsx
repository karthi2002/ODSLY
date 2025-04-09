import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import GradientBorderButton from '../Button/GradientBorderButton';
import Colors from '../../utils/Colors';

const OptionsFlatList = ({ data, selectedItems, onSelect }) => {
  const handleSelect = (item) => {
    const isSelected = selectedItems.includes(item);
    if (isSelected) {
      onSelect(selectedItems.filter((i) => i !== item));
    } else {
      onSelect([...selectedItems, item]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select your Betting Preferences</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <GradientBorderButton
            title={item}
            onPress={() => handleSelect(item)}
            showBorderGradient={false}
            backgroundColor={Colors.secondary}
            textColor= {Colors.primary}
            showTextGradient={true}
            disabled={false}
            paddingVertical={5}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    width: '100%',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: Colors.text,
    textAlign: 'left',
  },
  listContainer: {
    width: '100%',
  },
});

export default OptionsFlatList;
