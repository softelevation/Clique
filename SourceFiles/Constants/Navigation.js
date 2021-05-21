import React, {Component} from 'react';

//Navigation Libraries
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createSwitchNavigator} from '@react-navigation/compat';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Constants
import {IMG} from '../Constants/ImageConstant';
import {CommonColors} from '../Constants/ColorConstant';
import {navigationRef, isReadyRef} from './NavigationService';

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
import ForgotPassword from '../screens/forgot/index';
import ForgotMail from '../screens/forgot/mail/index';
import RecoverPassword from '../screens/forgot/recover/index';

//Dashborad Flow Files
import Dashboard from '../DashboardFlow/Dashboard';
// import Profile from '../DashboardFlow/Profile';
import Nearby from '../DashboardFlow/Nearby';
import Scan from '../DashboardFlow/Scan';
import UserProfile from '../DashboardFlow/UserProfile';

// Profile Inner Flow
import QrCode from '../DashboardFlow/QrCode';
import JobDetail from '../DashboardFlow/JobDetail';
import PurchaseCard from '../DashboardFlow/PurchaseCard';
import SyncToCard from '../DashboardFlow/SyncToCard';
import TempProfile from '../DashboardFlow/TempProfile';
import AddJob from '../DashboardFlow/AddJob';
import ChoosePassword from '../screens/choose-password';
import OwnProducts from '../screens/own-products';
import ScanCard from '../screens/own-products/scan-card';
import ActivatedCard from '../screens/own-products/activated-card';
import Contacts from '../screens/messages/contacts';
import {LinearGradient} from 'react-native-svg';
import {Text} from '../components';
import BottomTab from '../common/bottom-tab';
import Chat from '../screens/messages';
import Profile from '../screens/profile';
import Pro from '../screens/pro';
import Messages from '../screens/messages/chat';
import EditProfile from '../screens/profile/edit';
import Settings from '../screens/settings';
import ChangePasswordSettings from '../screens/settings/change-password';
import HelpAndTutorials from '../screens/settings/help-and-tutorials';

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
    <Stack.Navigator initialRouteName="AutoLogin" headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AutoLogin" component={AutoLogin} />
      <Stack.Screen name="OTPView" component={OTPView} />
      <Stack.Screen name="RegisterName" component={RegisterName} />
      <Stack.Screen name="RegisterMobile" component={RegisterMobile} />
      <Stack.Screen name="RegisterOTPView" component={RegisterOTPView} />
      <Stack.Screen name="RegisterEmail" component={RegisterEmail} />
      <Stack.Screen name="RegisterProfilePic" component={RegisterProfilePic} />
      <Stack.Screen name="RegisterBio" component={RegisterBio} />
      <Stack.Screen
        name="RegisterSocialMedia"
        component={RegisterSocialMedia}
      />
      <Stack.Screen name="Congratulation" component={Congratulation} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ForgotMail" component={ForgotMail} />
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
      <Stack.Screen name="ChoosePassword" component={ChoosePassword} />
      <Stack.Screen name="OwnProducts" component={OwnProducts} />
      <Stack.Screen name="ScanCard" component={ScanCard} />
      <Stack.Screen name="ActivatedCard" component={ActivatedCard} />
      <Stack.Screen name="Contacts" component={Contacts} />
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
      {/* <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="AddJob"
        component={AddJob}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
function ChatStack() {
  return (
    <Stack.Navigator initialRouteName="Chat" headerMode="none">
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

// Use For Hide Tab bar

//Dashboard Stacks
function DashboardSubStack() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTab {...props} />}
      initialRouteName="Profile">
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Nearby" component={NearByStackScreen} />
      <Tab.Screen name="Pro" component={Pro} />
      <Tab.Screen name="Chat" component={ChatStack} />
      <Tab.Screen name="Setting" component={Settings} />
    </Tab.Navigator>
  );
}
function DashboardStack() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Profile">
      <Tab.Screen name="Profile" component={DashboardSubStack} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen
        name="ChangePasswordSettings"
        component={ChangePasswordSettings}
      />
      <Stack.Screen name="HelpAndTutorials" component={HelpAndTutorials} />
    </Stack.Navigator>
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
    initialRouteName: 'Dashboard',
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
