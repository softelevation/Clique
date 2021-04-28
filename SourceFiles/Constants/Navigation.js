import React, {Component} from 'react';
import {Button, TouchableOpacity, Image, View, Text} from 'react-native';

//Navigation Libraries
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createSwitchNavigator} from '@react-navigation/compat';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Constants
import {IMG} from '../Constants/ImageConstant';
import {CommonColors} from '../Constants/ColorConstant';
import {ConstantKeys} from '../Constants/ConstantKey';
import {SetFontSize} from '../Constants/FontSize';
import {navigationRef, isReadyRef} from './NavigationService';

//Third Party
// import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

//Initial Flow Files
import Tutorial from '../InitialFlow/Tutorial';
import AutoLogin from '../InitialFlow/AutoLogin';
import Login from '../InitialFlow/Login';
import OTPView from '../InitialFlow/OTPView';
import RegisterName from '../InitialFlow/RegisterName';
import RegisterMobile from '../InitialFlow/RegisterMobile';
import RegisterOTPView from '../InitialFlow/RegisterOTPView';
import RegisterEmail from '../InitialFlow/RegisterEmail';
import RegisterProfilePic from '../InitialFlow/RegisterProfilePic';
import RegisterBio from '../InitialFlow/RegisterBio';
import RegisterSocialMedia from '../InitialFlow/RegisterSocialMedia';
import Congratulation from '../InitialFlow/Congratulation';

//Dashborad Flow Files
import Dashboard from '../DashboardFlow/Dashboard';
import Profile from '../DashboardFlow/Profile';
import Nearby from '../DashboardFlow/Nearby';
import Scan from '../DashboardFlow/Scan';
import UserProfile from '../DashboardFlow/UserProfile';

// Profile Inner Flow
import QrCode from '../DashboardFlow/QrCode';
import JobDetail from '../DashboardFlow/JobDetail';
import PurchaseCard from '../DashboardFlow/PurchaseCard';
import SyncToCard from '../DashboardFlow/SyncToCard';
import TempProfile from '../DashboardFlow/TempProfile';
import EditProfile from '../DashboardFlow/EditProfile';
import AddJob from '../DashboardFlow/AddJob';

//Constant Variable for navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//Deeplink
const linking = {
  prefixes: ['thewebtual://'],
  config: {
    screens: {
      Dashboard: 'Dashboard',
    },
  },
};

// Tutorial Flow Navigator

function TutorialFlow() {
  return (
    <Stack.Navigator initialRouteName="Tutorial">
      <Stack.Screen
        name="Tutorial"
        component={Tutorial}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

// Initial Flow Navigator
function InitialFlow() {
  return (
    <Stack.Navigator
      initialRouteName="AutoLogin"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AutoLogin"
        component={AutoLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTPView"
        component={OTPView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterName"
        component={RegisterName}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterMobile"
        component={RegisterMobile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterOTPView"
        component={RegisterOTPView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterEmail"
        component={RegisterEmail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterProfilePic"
        component={RegisterProfilePic}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterBio"
        component={RegisterBio}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterSocialMedia"
        component={RegisterSocialMedia}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Congratulation"
        component={Congratulation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function DashboardStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PurchaseCard"
        component={PurchaseCard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SyncToCard"
        component={SyncToCard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Scan"
        component={Scan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function NearByStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Nearby">
      <Stack.Screen
        name="Nearby"
        component={Nearby}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function ScanStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Scan">
      <Stack.Screen
        name="Scan"
        component={Scan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QrCode"
        component={QrCode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SyncToCard"
        component={SyncToCard}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QrCode"
        component={QrCode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PurchaseCard"
        component={PurchaseCard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SyncToCard"
        component={SyncToCard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TempProfile"
        component={TempProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddJob"
        component={AddJob}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

// Use For Hide Tab bar
shouldTabBarVisible = (route) => {
  try {
    return route.state.index < 1;
  } catch (e) {
    return true;
  }
};

//Dashboard Stacks
function DashboardStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: CommonColors.whiteColor,
        inactiveTintColor: CommonColors.inActiveColor,
        // showLabel: false,
        style: {
          backgroundColor: CommonColors.appBarColor,
          borderTopWidth: 0,
        },
      }}
      initialRouteName="Dashboard">
      <Tab.Screen
        name="Dashboard"
        component={DashboardStackScreen}
        options={({route}) => ({
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarVisible: shouldTabBarVisible(route),
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={focused ? IMG.TabFlow.HomeSelect : IMG.TabFlow.Home}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
                tintColor: color,
              }}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Nearby"
        component={NearByStackScreen}
        options={({route}) => ({
          tabBarLabel: 'Near By',
          headerShown: false,
          tabBarVisible: shouldTabBarVisible(route),
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={focused ? IMG.TabFlow.PinSelect : IMG.TabFlow.Pin}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
                tintColor: color,
              }}
            />
          ),
        })}
      />
      {/* <Tab.Screen name="PRO" component={NearByStackScreen}

                options={({ route }) => ({
                    tabBarLabel: 'Near By',
                    headerShown: false,
                    tabBarVisible : shouldTabBarVisible(route),
                    tabBarIcon: ({ focused, color, size }) => (
                        <LinearGradient colors={['rgb(105,97,255)', 'rgb(232,102,182)']}
                                    style={{  position: 'absolute',
                                            bottom: 20, // space from bottombar
                                            height: 58, width: 58, borderRadius: 58, backgroundColor: '#5a95ff',
                                            justifyContent: 'center', alignItems: 'center', shadowColor: CommonColors.blackColor,
                                            shadowOffset:{width:0, height:3}, shadowOpacity: 0.4, shadowRadius:3, elevation:3
                                        }}>
                                    <Text style={{fontSize: SetFontSize.ts14, color: CommonColors.whiteColor, fontFamily: ConstantKeys.Averta_BOLD}}>PRO</Text>
                        </LinearGradient>

                    ),
                })}
            /> */}
      <Tab.Screen
        name="Scan"
        component={ScanStackScreen}
        options={({route}) => ({
          tabBarLabel: 'Scan',
          headerShown: false,
          tabBarVisible: shouldTabBarVisible(route),
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={focused ? IMG.TabFlow.ScanSelect : IMG.TabFlow.Scan}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
                tintColor: color,
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={({route}) => ({
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarVisible: shouldTabBarVisible(route),
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={focused ? IMG.TabFlow.ProfileSelect : IMG.TabFlow.Profile}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
                tintColor: color,
              }}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

//********************** Switch Navigator **********************/

const AppNavigator = createSwitchNavigator(
  {
    Tutorial: TutorialFlow,
    Login: InitialFlow,
    Dashboard: DashboardStack,
  },
  {
    initialRouteName: 'Tutorial',
  },
);

//***************************************************************/

export default class Navigation extends Component {
  async componentDidMount() {}

  render() {
    return (
      <NavigationContainer
        linking={linking}
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}>
        <AppNavigator />
      </NavigationContainer>
    );
  }
}

{
  /* <View
                            style={{
                                position: 'absolute',
                                bottom: 20, // space from bottombar
                                height: 58,
                                width: 58,
                                borderRadius: 58,
                                backgroundColor: '#5a95ff',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{fontSize: SetFontSize.ts14, color: CommonColors.whiteColor, fontFamily: ConstantKeys.Averta_BOLD}}>PRO</Text>
                        </View> */
}
