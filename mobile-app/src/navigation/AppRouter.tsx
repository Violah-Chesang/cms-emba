import React, { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import Dashboard from '../screens/Dashboard';
import AllMembers from '../screens/members/AllMembers';
import Youth from '../screens/members/Youth';
import Women from '../screens/members/Women';
import Men from '../screens/members/Men';
import Jss from '../screens/members/Jss';

import CustomDrawerContent from '../navigation/CustomDrawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={Dashboard}  options={{ headerShown: false }}/>

    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
   
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="AllMembers" component={AllMembers} />
      <Drawer.Screen name="Youth" component={Youth} />
      <Drawer.Screen name="Women" component={Women} />
      <Drawer.Screen name="Men" component={Men} />
      <Drawer.Screen name="Jss" component={Jss} />

    </Drawer.Navigator>
  );
}

const AppRouter: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to check auth status:", error);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <DrawerNavigator /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default AppRouter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
