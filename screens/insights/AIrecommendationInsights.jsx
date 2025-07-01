import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { insights } from '../../json/AIRecommendation.jsx';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../utils/Colors.jsx';
import GradientButton from '../../components/Button/GradientButton.jsx';

const AIrecommendationInsights = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>🤖AI Driven Recommendations</Text>
            {insights.map((insight, index) => (
                <LinearGradient
                    key={index}
                    colors={["#029EFE", "#6945E2", "#E9098E"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientBorder}
                >
                    <View style={styles.AiRecommendInner}>
                        <Text style={styles.AiRecommendText}>{insight.titlehead}</Text>
                    </View>
                </LinearGradient>
            ))}
            <GradientButton
                label="View More"
                onPress={() => {}}
                arrowEnable={false}
                style={{ width: '100%' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        color: Colors.secondary,
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 20,
    },
    gradientBorder: {
        padding: 2,
        borderRadius: 10,
        marginVertical: 6,
    },
    AiRecommendInner: {
        backgroundColor: Colors.background,
        borderRadius: 10,
        padding: 14,
    },
    AiRecommendText: {
        color: Colors.secondary,
        fontSize: 14,
        fontWeight: "500",
    },
});

export default AIrecommendationInsights;
