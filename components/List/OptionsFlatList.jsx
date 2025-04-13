import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import GradientBorderButton from '../Button/GradientBorderButton';
import Colors from '../../utils/Colors';

const OptionsFlatList = ({ data, selectedItem, onSelect }) => {
  const handleSelect = (item) => {
    if (selectedItem === item) {
      onSelect(null);
    } else {
      onSelect(item); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select your Betting Preference</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => {
          const isSelected = selectedItem === item;
          return (
            <GradientBorderButton
              title={item}
              onPress={() => handleSelect(item)}
              showBorderGradient={isSelected}
              backgroundColor={isSelected ? Colors.blue : Colors.secondary}
              textColor={isSelected ? Colors.secondary : Colors.primary}
              showTextGradient={!isSelected}
              disabled={false}
              paddingVertical={8}
            />
          );
        }}
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
