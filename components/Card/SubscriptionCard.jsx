import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from '../../utils/Colors';
import { GradientText } from "../Button/GradientText";
import GradientButton from "../Button/GradientButton";
import { LineGradient } from "../../layouts/LineGradient";
import { plans } from "../../json/subscriptionPlan";
import { useNavigation } from "@react-navigation/native";


const RowItem = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export const SubscriptionCard = ({ membership, membershipExpiry }) => {
  
  const navigation = useNavigation();

 const selectedMembership = membership || 'free';

  // Correctly find the plan from the array
  const plan = plans.find((p) => p.id === selectedMembership) || {
    name: "Free",
    features: ["No Perks Available"],
  };

  return (
    <View style={styles.betCard}>
      <GradientButton
        label="SUBSCRIPTION"
        onPress={() => {}}
        arrowEnable={false}
        style={{ borderRadius: 50 }}
      />

      <View style={{ marginVertical: 10 }}>
       <RowItem
          label="Plan:"
          value={
            membership === plan.id
              ? `${plan.name} (Active)`
              : plan.name
          }
        />
        <RowItem
          label="Next Billing:"
        value={
          membership === "free"
            ? "No Billing"
            : membershipExpiry
            ? new Date(membershipExpiry).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "N/A"
        }
        />
        <RowItem label="Perks:" value={plan.features.join(", ")} />
      </View>

      <LineGradient style={{ marginVertical: 10 }} />

      <View style={styles.betActions}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileStack", { screen: 'Upgrade' })}>
          <GradientText text="Manage Plan" style={{ fontSize: 18 }} />
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity>
          <GradientText text="Refer & Earn" style={{ fontSize: 18 }} />
        </TouchableOpacity>
      </View>

      {/* Decorative Circles */}
      <View style={[styles.circle1, styles.topRight]} />
      <View style={[styles.circle2, styles.bottomRight]} />
      <View style={[styles.circle3, styles.centerLeft]} />
    </View>
  );
};


const styles = StyleSheet.create({
    betCard: {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: "#3A3162",
      borderWidth: 1.5,
      borderColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 15,
      padding: 16,
      width: '100%'
    },
    row: {
      flexDirection: "row",
      justifyContent: "start",
      marginBottom: 10,
    },
    label: {
      color: Colors.secondary,
      width: '30%',
      fontSize: 16,
      fontWeight: "400",
    },
    value: {
      width: '70%',
      color: Colors.secondary,
      flexShrink: 1,
      textAlign: "Right",
      fontSize: 16,
      fontWeight: "600",
    },
    betActions: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 12,
    },
    separator: {
      color: "#DD2EFF",
      marginHorizontal: 6,
    },
    circle1: {
      position: 'absolute',
      width: 180,
      height: 180,
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      zIndex: 0,
    },
    circle1: {
      position: 'absolute',
      width: 200,
      height: 200,
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      zIndex: 0,
    },
    circle2: {
      position: 'absolute',
      width: 220,
      height: 220,
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      zIndex: 0,
    },
    circle3: {
      position: 'absolute',
      width: 320,
      height: 320,
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      zIndex: 0,
    },
    topRight: {
      top: -20,
      right: -80,
    },
    bottomRight: {
      bottom: -90,
      right: -150,
    },
    centerLeft: {
      left: -80,
      transform: [{ translateX: -80 }],
    },
  });