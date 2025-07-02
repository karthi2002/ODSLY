import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CustomHeader from "../../layouts/CustomHeader";
import Colors from "../../utils/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import GradientButton from "../../components/Button/GradientButton";
import GradientBorderButton from "../../components/Button/GradientBorderButton";
import { fetchProfile } from "../../redux/profile/profileActions";
import { plans } from "../../json/subscriptionPlan";

const PricingPlans = () => {
  const dispatch = useDispatch();

  const membership = useSelector((state) => state.profile.profile.membership);
  const [selectedPlanId, setSelectedPlanId] = useState("free");

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (membership) {
      setSelectedPlanId(membership);
    }
  }, [membership]);

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

  const handleUpgrade = () => {
    console.log("Upgrade to:", selectedPlanId);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={"Upgrade"} />
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.plansRow}>
          {plans.map((plan) => {
            const isSelected = plan.id === selectedPlanId;
            const isPaidPlan = plan.id !== "free";
            return (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planContainer,
                  isSelected && styles.selectedPlanContainer,
                ]}
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
          <Text style={styles.featuresTitle}>Features included:</Text>
          <FlatList
            data={selectedPlan.features}
            keyExtractor={(item, index) =>
              `${selectedPlan.id}-feature-${index}`
            }
            renderItem={({ item }) => (
              <View style={styles.featurePoint}>
                <AntDesign name="checkcircleo" size={20} color="white" />
                <Text style={styles.featureItem}> {item}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.buttonWrapper}>
        {selectedPlanId === membership ? (
          <GradientBorderButton
            title="Your Current Plan"
            onPress={() => {}}
            showBorderGradient={false}
            backgroundColor={Colors.LightGray}
            borderColor={Colors.background}
            textColor={Colors.secondary}
            showTextGradient={false}
            disabled={true}
            paddingVertical={12}
          />
        ) : (
          <GradientButton
            label="Upgrade Now"
            onPress={handleUpgrade}
            arrowEnable={true}
            style={{ widht: "100%" }}
          />
        )}
      </View>
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
    paddingHorizontal: 2,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 60,
    left: 20,
    right: 20,
  },

  plansRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  planContainer: {
    flex: 1,
    margin: 6,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    alignItems: "center",
    backgroundColor: Colors.secondary,
    height: 160,
  },
  selectedPlanContainer: {
    borderColor: Colors.orange,
    borderWidth: 6,
  },
  selectedTag: {
    position: "absolute",
    top: -14,
    backgroundColor: Colors.orange,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 50,
    fontSize: 12,
    fontWeight: "600",
  },
  planName: {
    marginTop: 28,
    fontSize: 16,
    fontWeight: "bold",
  },
  planPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 18,
  },
  paidPlan: {
    fontSize: 12,
    color: Colors.secondary / 40,
    marginTop: 1,
  },
  featuresContainer: {
    marginTop: 40,
    marginHorizontal: 15,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 25,
    color: Colors.secondary,
  },
  featurePoint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
  },
  featureItem: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "start",
    color: Colors.secondary,
  },
});

export default PricingPlans;
