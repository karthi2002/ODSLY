import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { bettingBehaviorData } from '../../json/BettingBehhavior.jsx';

const BettingBehaviorComponent = () => {
    const { header, insights } = bettingBehaviorData;

    // First item (titlehead, contenthead, etc.)
    const mainInsight = insights[0];
    // Rest of the insights (those with id)
    const remainingInsights = insights.slice(1);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{header}</Text>

            {/* Full-width main card */}
            <View style={styles.fullWidthWrapper}>
                <InsightCard
                    title={mainInsight.titlehead}
                    content={mainInsight.contenthead}
                    icon={mainInsight.iconhead}
                    color={mainInsight.colorhead}
                    fullWidth
                />
            </View>

            {/* Grid of smaller cards */}
            <View style={styles.grid}>
                {remainingInsights.map((insight) => (
                    <InsightCard
                        key={insight.id}
                        title={insight.title}
                        content={insight.content}
                        icon={insight.icon}
                        color={insight.color}
                    />
                ))}
            </View>
        </View>
    );
};

const InsightCard = ({ title, content, icon, color, fullWidth }) => {
    return (
        <Card style={[styles.card, fullWidth ? styles.fullWidthCard : null, { backgroundColor: color || '#2D2F41' }]}>
            <Card.Content>
                <View style={styles.cardHeader}>
                    {icon && <Icon name={icon} size={16} color="#fff" style={styles.icon} />}
                    <Text style={styles.cardTitle}>{title}</Text>
                </View>
                <Text style={styles.cardText}>{content}</Text>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#0E0F23',
        flex: 1,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 20,
    },
    fullWidthWrapper: {
        marginBottom: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        marginBottom: 16,
        borderRadius: 12,
        elevation: 4,
    },
    fullWidthCard: {
        width: '100%',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    cardTitle: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    cardText: {
        fontSize: 13,
        color: '#ffffff',
        opacity: 0.9,
    },
    icon: {
        marginRight: 6,
    },
});

export default BettingBehaviorComponent;
