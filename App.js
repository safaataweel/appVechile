import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Intro1 from './Screen/Intro/IntroScreen1';
import Intro2 from './Screen/Intro/IntroScreen2';
import Intro3 from './Screen/Intro/IntroScreen3';
import Login from './Screen/Login/Login';
import RoleSelection from './Screen/RoleSelection/RoleSelection';
import SignUp from './Screen/SignUp/SignUp';

import WorkingHours from './Screen/WorkingHours/WorkingHours';
import ProfilePicture from './Screen/ProfilePicture/ProfilePicture';
import Home from './Screen/Home/Home';

import Profile from './Screen/Profile/Profile';
import Garage from './Screen/Garage/Garage';
import EditProfile from './Screen/EditProfile/EditProfile';
import AddCarScreen from './Screen/Garage/AddCar'; 
import HistoryScreen from './Screen/History/History'; // Create this screen
import LanguageScreen from './Screen/Language/LanguageScreen';
import ChangePasswordScreen from './Screen/Profile/ChangePasswordScreen';
//import CurrentBookingScreen from './Screen/Booking/Booking';
import ForgotPasswordScreen from './Screen/Login/ForgotPasswordScreen'; // Create this screen
import ResetPasswordScreen from './Screen/Login/ResetPasswordScreen'; // Create this screen
import Book from './Screen/Book/Book';
import ServicesPage from './Screen/editService/editService'; // Create this screen
import AddService from './Screen/editService/AddService';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const RootStack = createStackNavigator();

// Profile Stack
function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Garage" component={Garage} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AddCar" component={AddCarScreen} options={{ title: 'Add Car' }} />
      {/* No need to pass role here, simply navigate */}
      <Stack.Screen name="WorkingHours" component={WorkingHours} options={{ title: 'Working Hours' }} />
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} options={{ title: 'History' }} />
      <Stack.Screen name="LanguageScreen" component={LanguageScreen} options={{ title: 'Language' }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Change Password' }} />
      <Stack.Screen name="ServicesPage" component={ServicesPage} options={{ title: 'Services' }} />
<Stack.Screen name="AddService" component={AddService} options={{ title: 'Add Service' }} />
    </Stack.Navigator>
  );
}



// Bottom Tabs
function BottomTabs({ route }) {
  const { role, profilePicture } = route.params || {};

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#086189',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name==='booking'){
            iconName = focused ? 'book' : 'book-outline';
          }else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        children={({ navigation }) => (
          <Home 
            navigation={navigation} 
            route={{ params: { role, profilePicture } }} 
          />
        )} 
      />
      
      {/* <Tab.Screen name="booking" component={CurrentBookingScreen} options={{ title: 'Current Booking' }} /> */}
      <Tab.Screen name="Profile" component={ProfileNavigator} />
     
    </Tab.Navigator>
  );
}

// Intro screens stack
function IntroNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Intro1">{props => <Intro1 {...props} activeDotIndex={1} />}</Stack.Screen>
      <Stack.Screen name="Intro2">{props => <Intro2 {...props} activeDotIndex={2} />}</Stack.Screen>
      <Stack.Screen name="Intro3">{props => <Intro3 {...props} activeDotIndex={3} />}</Stack.Screen>
    </Stack.Navigator>
  );
}

// Registration flow
function RegNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelection} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ProfilePicture" component={ProfilePicture} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ title: 'Reset Password' }} />

    </Stack.Navigator>
  );
}
// App entry
export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="IntroFlow" component={IntroNavigator} />
        <RootStack.Screen name="RegFlow" component={RegNavigator} />
        <RootStack.Screen name="MainTabs" component={BottomTabs} />
        <RootStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <RootStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <RootStack.Screen name ="Book" component={Book}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}