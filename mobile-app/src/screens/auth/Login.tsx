import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppDispatch, RootState } from '../../store/store';
import { loginUser } from '../../store/slices/authSlice';
import LabeledInput from './LabeledInput';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
};

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async () => {
    //console.log('Username:', username);
    //console.log('Password:', password);
    try {
     // console.log('Dispatching loginUser...');
      const result = await dispatch(loginUser({ userName: username, password })).unwrap();
     // console.log('Dispatch result:', result);
     
      if (result) {
        Alert.alert('Login successful!');
        navigation.navigate('Dashboard');
      }
    } catch (error: any) {
      console.error('Login Error:', error); // Enhanced error logging
      Alert.alert('Login failed', error.message || 'Unknown error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/auth-backimage.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Image
            source={require('../../../assets/mck_logo.png')}
            style={styles.image}
          />
          <Text style={styles.text}>EMBAKASI METHODIST CHURCH</Text>
          <LabeledInput
            label="Username"
            value={username}
            onChangeText={setUsername}
          />
          <LabeledInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
            <Text style={styles.loginBtnText}>{status === 'loading' ? 'Logging in...' : 'Login'}</Text>
          </TouchableOpacity>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={styles.accountContainer}>
            <Text style={styles.accountText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.accountButton}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#172554',
    opacity: 0.8,
    zIndex: 1,
  },
  content: {
    margin: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
  },
  image: {
    height: '15%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 23,
    color: 'white',
    margin: 15,
  },
  loginBtn: {
    paddingHorizontal: 70,
    paddingVertical: 10,
    backgroundColor: "#0369a1",
    borderRadius: 6,
    marginTop: 20,
  },
  loginBtnText: {
    color: "white",
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  accountContainer: {
    flexDirection: 'row',
    marginTop: 25,
  },
  accountText: {
    color: '#9ca3af',
    fontSize: 16,
  },
  accountButton: {
    color: '#06b6d4',
    fontSize: 17,
  }
});

export default Login;
