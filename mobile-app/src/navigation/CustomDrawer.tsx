import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <DrawerContentScrollView {...props}>
       <DrawerItem
        label="Dashboard"
        onPress={() => props.navigation.navigate('Dashboard')}
      />
      <TouchableOpacity
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        style={styles.dropdownToggle}
      >
        <Text style={styles.dropdownToggleText}>Members</Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdownContainer}>
          <DrawerItem
            label="All Members"
            onPress={() => props.navigation.navigate('AllMembers')}
          />
          <DrawerItem
            label="Youth Fellowship"
            onPress={() => props.navigation.navigate('Youth')}
          />
          <DrawerItem
            label="Women Fellowship"
            onPress={() => props.navigation.navigate('Women')}
          />
          <DrawerItem
            label="Men Fellowship"
            onPress={() => props.navigation.navigate('Men')}
          />
          <DrawerItem
            label="Junior Sunday School"
            onPress={() => props.navigation.navigate('Jss')}
          />
        </View>
      )}
     
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  dropdownToggle: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  dropdownToggleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    paddingLeft: 16,
  },
});

export default CustomDrawerContent;
