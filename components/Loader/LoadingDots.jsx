import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';

const LoadingDots = ({ text = "Loading..." }) => {
  const dot1 = useRef(new Animated.Value(1)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;
  const dot4 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(dot1, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot2, { toValue: 0.3, duration: 300, useNativeDriver: true }),
          Animated.timing(dot3, { toValue: 0.3, duration: 300, useNativeDriver: true }),
          Animated.timing(dot4, { toValue: 0.3, duration: 300, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(dot1, { toValue: 0.3, duration: 300, useNativeDriver: true }),
          Animated.timing(dot2, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(dot2, { toValue: 0.3, duration: 300, useNativeDriver: true }),
          Animated.timing(dot3, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(dot3, { toValue: 0.3, duration: 300, useNativeDriver: true }),
          Animated.timing(dot4, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]),
      ]).start(() => animate());
    };

    animate();
  }, []);

  const getGradientText = () => {
    const words = text.split(" ");
    const colors = ['#029EFE', '#6945E2', '#E9098E'];
    return words.map((word, index) => (
      <Text key={index} style={{ color: colors[index % colors.length] }}>
        {word + ' '}
      </Text>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        <Animated.View style={[styles.dot, { opacity: dot1 }]} />
        <Animated.View style={[styles.dot, { opacity: dot2 }]} />
        <Animated.View style={[styles.dot, { opacity: dot3 }]} />
        <Animated.View style={[styles.dot, { opacity: dot4 }]} />
      </View>
      <Text style={styles.gradientText}>{getGradientText()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 8,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#000A34',
  },
  gradientText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default LoadingDots;
