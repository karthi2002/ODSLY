import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import roiData from '../../json/ROIData.jsx';


const ROIComponent = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{roiData.header}</Text>
            <View style={styles.row}>
                {roiData.categories.map((category, index) => (
                    <View key={index} style={styles.column}>
                        <Text style={styles.subTitle}>{category.title}</Text>
                        {category.items.map((item, itemIndex) => (
                            <Text key={itemIndex} style={[styles.item, { color: item.color }]}>
                                {item.text} {item.emoji}
                            </Text>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1E1B3A',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    item: {
        fontSize: 14,
        marginVertical: 3,
    },
});

export default ROIComponent;