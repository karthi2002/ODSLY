import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../utils/Colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const { width } = Dimensions.get('window');

const GradientButton = ({ label, onPress, arrowEnable, style, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} disabled={disabled}>
      <LinearGradient
        colors={['#029EFE', '#6945E2', '#E9098E']}
        locations={[0, 0.37, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, style, disabled && { opacity: 0.6 }]}
      >
        <View style={[styles.container, style]}>
          <Text style={styles.text}>{label}</Text>
          {arrowEnable && <FontAwesome6 name="arrow-right-long" size={18} color={Colors.secondary} />}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.85 - 40, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: 10,
  },
  button: {
    width: width * 0.85 - 40,
    alignSelf: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 10,
  },
  text: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default GradientButton;