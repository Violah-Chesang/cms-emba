import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface LabeledInputProps extends TextInputProps {
  label: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    width: screenWidth - 100,
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

export default LabeledInput;
