import * as React from 'react';
import {Text, View, Image, StyleSheet, Easing} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from './Auth/Login';
import Feed from './Feed/Feed';
import Profile from './Profile/Profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const config = {
  animation: 'timing',
  config: {
    duration: 300,
    easing: Easing.linear,
  },
};
const closeconfig = {
  animation: 'timing',
  config: {
    duration: 500,
    easing: Easing.linear,
  },
};
function HomeTabs() {
  return (
    <Tab.Navigator
      shifting={true}
      initialRouteName="Feed"
      activeColor={'tomato'}
      inactiveColor="#ccc"
      barStyle={{backgroundColor: 'tomato'}}
      tabBarOptions={{showLabel: false, keyboardHidesTabBar: true}}>
      {/* <Tab.Navigator initialRouteName="Home" activeColor="#f0edf6" inactiveColor="#3e2465" barStyle={{ borderBottomWidth: 1, backgroundColor:'orange', borderTopLeftRadius: 25, borderTopRightRadius: 25, borderBottomEndRadius: 25, borderBottomLeftRadius:25, borderColor: 'transparent', overflow: 'hidden', margin: 20 }}>  */}
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({color, focused}) => (
            <View style={styles.iconContainer}>
              <View style={styles.iconImageContainer}>
                {focused ? (
                  <Icon name={'home'} color={'pink'} />
                ) : (
                  <Icon name={'home'} color={'grey'} />
                )}
              </View>
              {focused && <Text style={styles.label}>Feed</Text>}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function Drawertabs() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        // gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: config,
          close: closeconfig,
        },
      }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default Routes;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImageContainer: {
    width: 20,
    height: 20,
  },
  iconImage: {
    width: null,
    height: null,
    resizeMode: 'contain',
    flex: 1,
  },
  //   label: {
  //     fontSize: 10,
  //     color: baseColor,
  //     fontFamily: baseFont,
  //   },
});
