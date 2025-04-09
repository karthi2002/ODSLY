import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import GradientBorderButton from '../Button/GradientBorderButton';

const bettingOptions = [
  'Single Bet',
  'Accumulators',
  'Live Betting',
  'Odds Comparison',
];

const OptionsFlatList = ({ onOptionSelect }) => {
  return (
    <View style={styles.container}>
      <FlatList
        vertical
        data={bettingOptions}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        renderItem={({ item }) => (
          <GradientBorderButton
            title={item}
            onPress={() => onOptionSelect?.(item)}
            style={styles.buttonStyle}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  buttonStyle: {
    minWidth: 150,
  },
});

export default OptionsFlatList;
