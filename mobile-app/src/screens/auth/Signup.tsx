import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppDispatch } from '../../store/store';
import { registerUser } from '../../store/slices/authSlice';
import LabeledInput from './LabeledInput';

type AuthStackParamList = {
    Login: undefined;
    Signup: undefined;
    Dashboard: undefined;
};

const Signup: React.FC = () => {
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmpassword, setConfirmpassword] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

    const handleRegister = async () => {
        try {
            const result = await dispatch(registerUser({ userName: username, password })).unwrap();
            if (result) {
                Alert.alert('Registration successful!');
                navigation.navigate('Login');
            }
        } catch (error: any) {
            Alert.alert('Registration failed', error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                            label="First name"
                            value={firstname}
                            onChangeText={setFirstname}
                        />
                        <LabeledInput
                            label="Last name"
                            value={lastname}
                            onChangeText={setLastname}
                        />
                        <LabeledInput
                            label="Role"
                            value={role}
                            onChangeText={setRole}
                        />
                        <LabeledInput
                            label="Username"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <LabeledInput
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <LabeledInput
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <LabeledInput
                            label="Confirm password"
                            value={confirmpassword}
                            onChangeText={setConfirmpassword}
                            secureTextEntry
                        />
                        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
                            <Text style={styles.registerBtnText}>Sign Up</Text>
                        </TouchableOpacity>
                        <View style={styles.accountContainer}>
                            <Text style={styles.accountText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.accountButton}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        </KeyboardAvoidingView>
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
        height: '10%',
        resizeMode: 'contain',
        marginBottom: 20,
    },
    text: {
        fontSize: 22,
        color: 'white',
        margin: 15,
    },
    registerBtn: {
        paddingHorizontal: 70,
        paddingVertical: 10,
        backgroundColor: "#0369a1",
        borderRadius: 6,
        marginTop: 20,
    },
    registerBtnText: {
        color: "white",
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
        fontSize: 17
    }
});

export default Signup;
