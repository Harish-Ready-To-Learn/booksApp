import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BooksScreen from '../screens/BooksScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import {
  FAVORITE_ICON,
  TAB_HOME,
  follow_select,
  home_icon,
  home_select,
  home_unselect,
} from '../assets';
import {
  ICON_TINT_COLOR,
  PRIMARY_BACKGROUND,
  SECONDARY_BACKGROUND,
  TERTIARY_BACKGROUND,
} from '../constants/colors';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        name="BooksScreen"
        component={BooksScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? TERTIARY_BACKGROUND : '#000',
                }}
                source={focused ? home_select : home_unselect}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? TERTIARY_BACKGROUND : '#000',
                }}
                source={focused ? follow_select : FAVORITE_ICON}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    // height: 50,
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
    borderRadius: 10,
    opacity: 0.9,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  blurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
