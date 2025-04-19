import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  SafeAreaView,
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


import { Image } from "react-native";


const { width, height } = Dimensions.get("window");

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
            <Text style={styles.subtitle}>
              See What Matters. When It Matters.
            </Text>
          </View>
        </ImageBackground>
        );
      case 1:
        return (
            <View>
            <View style={styles.secondtextWrapper}>
            <Text style={styles.secondtitle}>Bet Better with AI Insights</Text>
            <Text style={styles.subtitle}>
            Track your trends. Understand your edge. Get smarter every game.
            </Text>
            </View>
            <View style={styles.imageWrapper}>
            <Image
              source={one} 
              style={styles.primaryImg}
              resizeMode="contain"
            />
            <Image
              source={onee} 
              style={styles.secondaryImg}
              resizeMode="contain"
            />
            </View>
 
            </View>
        );
      case 2:
        return (
          <View>
          <View style={styles.secondtextWrapper}>
          <Text style={styles.secondtitle}>Celebrate. Share. Compete.</Text>
          <Text style={styles.subtitle}>
          Join the community where sports bettors connect and compete.
          </Text>
          </View>
          <View style={styles.imageWrapper}>
          <Image
            source={two} 
            style={styles.primaryImg}
            resizeMode="contain"
          />
          <Image
            source={twoo} 
            style={styles.secondaryImg}
            resizeMode="contain"
          />
          </View>

          </View>
        );
      case 3:
        return <AuthScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section */}
      <View style={styles.top}>
  {stepIndex === 0 ? (
    <GradientButton
      label="Skip"
      onPress={() => navigation.navigate("Auth")}
      arrowEnable
      style={styles.skipbtn}
    />
  ) : (
    <GradientSkipButton
      label="Skip"
      onPress={() => navigation.navigate("Auth")}
      style={styles.skipbtn}
      accessibilityLabel="Skip onboarding"
    />
  )}
</View>


      {/* Middle Section with Image */}

      <View style={styles.mid}>
      {renderStepContent()}
        <View style={styles.stepWrapper}>
            <StepWizard currentStep={stepIndex} steps={steps} />
          </View>
      </View>


      {/* Bottom Section with CTA */}
      {stepIndex <= steps - 1 && (
      <View style={styles.bottom}>
          <GradientButton
            label="Start Now"
            onPress={handleNext}
            arrowEnable
            style={styles.btn}
          />
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
  top: {
    position:"absolute",
    top: 5,
    zIndex: 10,
    right:-10,
  },
  skipbtn:{
    width:100,
    justifyContent:"center",
  },
  mid: {
    flex: 1,
    marginTop:40,
    marginBottom:120,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom:30,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  textWrapper: {
    position: "absolute",
    top: 360,
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  secondtextWrapper: {
    position: "",
    top: 60,
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  secondtitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 22,
    color: "#ddd",
    textAlign: "center",
  },
  stepWrapper: {
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center',
      width: 380, // 3 steps * (20px width + 12px spacing)
      zIndex: 10,
    },
  ctaWrapper: {
    width: "90%",
  },
  btn:{
    alignItems:"center",
    width:420,
    justifyContent:"center",

  },
imageWrapper: {
  marginTop: 100,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
},

primaryImg: {
  width:300,
  height:500,
  resizeMode: 'contain',
  zIndex: 1,
  marginRight:180,
},
secondaryImg: {
  position: 'absolute',
  bottom: -160, // pushes it slightly below the main image
  right:-20,
  width: 350,
  height: 400,
  padding: 20,
 // Set to match the "recommendation card" background
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.3,
  shadowRadius: 10,
  zIndex: 10,}

});

export default WelcomeScreen;
