import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../layouts/CustomHeader';
import Colors from '../../utils/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import GradientButton from '../../components/Button/GradientButton';

// Define the pricing plans
const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '--',
    features: ['Bet Tracking', 'Community Engagement and Educational Content', 'Limited AI Insights','Preview Access to Leaderboards'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '~$15',
    features: ['5 Team Members', '2500+ UI Blocks', '50 GB Cloud Storage', 'Individual Email Account'],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: '~$22',
    features: ['Unlimited Team Members', '5000+ UI Blocks', '200 GB Cloud Storage', 'Individual Email Account', 'Premium Support'],
  },
];

const PricingPlans = () => {
  const [selectedPlanId, setSelectedPlanId] = useState('free');
  const selectedPlan = plans.find(plan => plan.id === selectedPlanId);

  return (
    <View style={styles.container}>
      <CustomHeader title={"Upgrade"}/>
        <ScrollView
            style={styles.content}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
      <View style={styles.plansRow}>
        {plans.map((plan) => {
          const isSelected = plan.id === selectedPlanId;
          const isPaidPlan = plan.id !== 'free';
          return (
            <TouchableOpacity
              key={plan.id}
              style={[styles.planContainer, isSelected && styles.selectedPlanContainer]}
              onPress={() => setSelectedPlanId(plan.id)}
            >
              {isSelected && <Text style={styles.selectedTag}>SELECTED</Text>}
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planPrice}>{plan.price}</Text>
              {isPaidPlan && <Text style={styles.paidPlan}>per month</Text>}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Features included :</Text>
        <FlatList
          data={selectedPlan.features}
          keyExtractor={(item, index) => `${selectedPlan.id}-feature-${index}`}
          renderItem={({ item }) => (
            <Text style={styles.featureItem}> <AntDesign name="checkcircleo" size={24} color="white" >{item}</AntDesign></Text>
          )}
        />
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
      },
      content: {
        paddingTop: 80,
        paddingHorizontal: 1,
      },
  plansRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  planContainer: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    height:160,
  },
  selectedPlanContainer: {
    borderColor: Colors.orange,
    borderWidth: 6,
  },
  selectedTag: {
    position: 'absolute',
    top: -15,
    backgroundColor: Colors.orange,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 50,
    fontWeight: 'bold',
  },
  planName: {
    marginTop:28,
    fontSize: 18,
    fontWeight: 'bold',
  },
  planPrice: {
    fontSize: 16,
    fontWeight:'bold',
    marginTop: 18,
  },
  paidPlan: {
    fontSize: 12,
    color:Colors.LightGray,
    marginTop: 1,
  },
  featuresContainer: {
    marginTop: 24,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    color:Colors.secondary,
  },
  featureItem: {
    fontSize: 14,
    fontWeight:'400',
    color:Colors.secondary,
    marginBottom: 4,
  },
});

export default PricingPlans;
