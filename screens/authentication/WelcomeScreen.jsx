import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
import two from "../../assets/images/two.png";


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
        <View style={styles.mainContainer}>
        {renderStepContent()}
        <StepWizard currentStep={stepIndex} steps={steps} />
        </View>

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
    padding: wp("5%"),
    zIndex: 10,
  },
  skipbtn: {
    width: wp("20%"),
    justifyContent: "center",
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",

  },
mainContainer: {
  flex: 1,
  width: "100%",
  justifyContent: "space-between",
  paddingBottom: hp("3%"),
  zIndex: 1,
},
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp("1%"),
  },
textWrapper: {
  alignItems: "center",
  marginBottom: hp("3%"),
},
  title: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    color: Colors.secondary,
    textTransform: "uppercase",
  },
  secondtitle: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    color: Colors.secondary,
    textTransform: "uppercase",
    marginBottom: hp("1%"),
  },
  subtitle: {
    fontSize: wp("4.5%"),
    color: Colors.LightGray,
    textAlign: "center",
  },
imageWrapper: {
  marginTop: hp("1%"),
  alignItems: "center",
},
primaryImg: {
  width: wp("100%"),
  height: hp("40%"),
  resizeMode: "contain",
},
content: {
  flex: 1,
  justifyContent: "flex-start",
  paddingTop: hp("6%"),
  paddingHorizontal: wp("5%"),
},
  bottom: {
    paddingVertical: hp("2%"),
    alignItems: "center",
    justifyContent: "center",
    top:hp("-5%"),
  },
});


export default WelcomeScreen;
