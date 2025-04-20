import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GradientButton from "../../components/Button/GradientButton";
import GradientSkipButton from "../../components/Button/GradientSkipButton";
import StepWizard from "../../components/Form/StepWizard";
import Colors from "../../utils/Colors";
import FootBallImage from "../../assets/images/american-football.png";
import one from "../../assets/images/one.png";
import onee from "../../assets/images/onee.png";
import two from "../../assets/images/two.png";
import twoo from "../../assets/images/twoo.png";

const { width } = Dimensions.get("window");

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [stepIndex, setStepIndex] = useState(0);
  const steps = 3;

  const handleNext = () => {
    if (stepIndex < steps - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      navigation.navigate("Auth");
    }
  };

  const renderStepContent = () => {
    switch (stepIndex) {
      case 0:
        return (
          <ImageBackground source={FootBallImage} style={styles.image}>
            <View style={styles.textWrapper}>
              <Text style={styles.title}>YOUR BETS</Text>
              <Text style={styles.subtitle}>See What Matters. When It Matters.</Text>
            </View>
          </ImageBackground>
        );
      case 1:
        return (
          <View style={styles.content}>
            <View style={styles.textWrapper}>
              <Text style={styles.secondtitle}>Bet Better with AI Insights</Text>
              <Text style={styles.subtitle}>
                Track your trends. Understand your edge. Get smarter every game.
              </Text>
            </View>
            <View style={styles.imageWrapper}>
              <Image source={one} style={styles.primaryImg} />
              <Image source={onee} style={styles.secondaryImg} />
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.content}>
            <View style={styles.textWrapper}>
              <Text style={styles.secondtitle}>Celebrate. Share. Compete.</Text>
              <Text style={styles.subtitle}>
                Join the community where sports bettors connect and compete.
              </Text>
            </View>
            <View style={styles.imageWrapper}>
              <Image source={two} style={styles.primaryImg} />
              <Image source={twoo} style={styles.secondaryImg} />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.topBar}>
        {stepIndex === 0 ? (
          <GradientButton label="Skip" onPress={() => navigation.navigate("Auth")} arrowEnable={true} style={styles.skipbtn} />
        ) : (
          <GradientSkipButton label="Skip" onPress={() => navigation.navigate("Auth")}  arrowEnable={true} style={styles.skipbtn} />
        )}
      </View>

      <View style={styles.mainContent}>
        {renderStepContent()}
        <StepWizard currentStep={stepIndex} steps={steps} />
      </View>

      {stepIndex <= steps - 1 && (
        <View style={styles.bottom}>
          <GradientButton label="Start Now" onPress={handleNext} arrowEnable />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBar: {
    alignItems: "flex-end",
  },
  skipbtn:{
    width:100,
    justifyContent:"center",
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingTop: 50,
    alignItems: "center",
  },
  textWrapper: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.secondary,
    textTransform: "uppercase",
  },
  secondtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.secondary,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.LightGray,
    textAlign: "center",
  },
  imageWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 10,
    marginTop: 30,
  },
  primaryImg: {
    width: 150,
    height: 250,
    resizeMode: "contain",
  },
  secondaryImg: {
    width: 150,
    height: 250,
    resizeMode: "contain",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  bottom: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WelcomeScreen;
