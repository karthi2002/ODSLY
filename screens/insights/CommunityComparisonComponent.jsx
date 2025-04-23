import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { communityComparisonData } from '../../json/communityComparisonData';

const CommunityComparisonComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{communityComparisonData.header}</Text>
            {communityComparisonData.insights.map((insight, index) => (
                <View key={index} style={[styles.insightCard, { borderColor: insight.colorhead }]}>
                    <View style={styles.insightContent}>
                        <FontAwesome5 name={insight.iconhead} size={24} color={insight.colorhead} style={styles.icon} />
                        <Text style={styles.title}>{insight.titlehead}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#1A237E',
        borderRadius: 8,
        margin: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 16,
    },
    insightCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    insightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 12,
    },
    title: {
        fontSize: 14,
        color: '#FFFFFF',
        flex: 1,
        flexWrap: 'wrap',
    },
});

export default CommunityComparisonComponent;