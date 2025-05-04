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
import SignUp from './Screen/SignUp/SignUp';
import RoleSelection from './Screen/RoleSelection/RoleSelection';
import ForgotPasswordScreen from './Screen/Login/ForgotPasswordScreen';
import ResetPasswordScreen from './Screen/Login/ResetPasswordScreen';
import ProfilePicture from './Screen/ProfilePicture/ProfilePicture';
import Home from './Screen/Home/Home';
import Profile from './Screen/Profile/Profile';
import Garage from './Screen/Garage/Garage';
import EditProfile from './Screen/EditProfile/EditProfile';
import AddCar from './Screen/Garage/AddCar';
import WorkingHours from './Screen/WorkingHours/WorkingHours';
import LanguageScreen from './Screen/Language/LanguageScreen';
import ChangePassword from './Screen/Profile/ChangePasswordScreen';
import HistoryScreen from './Screen/History/History';
import ServicesPage from './Screen/editService/editService';
import AddService from './Screen/editService/AddService';
import Certifications from './Screen/editceritification/editceritification';
import Book from './Screen/Book/Book';
import Payment from './Screen/Book/Pyment';
import ServiceDetails from './Screen/Home/ServiceDetails';
import WorkshopDetails from './Screen/Home/WorkshopDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const RootStack = createStackNavigator();


function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Garage" component={Garage} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "Edit Profile" }}/>
      <Stack.Screen name="AddCar" component={AddCar} />
      <Stack.Screen name="WorkingHours" component={WorkingHours} />
      <Stack.Screen name="LanguageScreen" component={LanguageScreen} options={{ title: "Language" }}/>
      <Stack.Screen name="ChangePassword" component={ChangePassword} 
      options={{title: 'ChangePassword'}}/>
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen name="ServicesPage" component={ServicesPage} />
      <Stack.Screen name="AddService" component={AddService} options={{title: 'Add Service' }}/>
      <Stack.Screen name="CertificationScreen" component={Certifications} />
    </Stack.Navigator>
  );
}


function BottomTabs({ route }) {
  const { role } = route.params || {};

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#086189',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        children={({ navigation }) => (
          <Home navigation={navigation} route={{ params: { role } }} />
        )}
      />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
}

// ⬇️ Intro Screens Stack
function IntroNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Intro1">{(props) => <Intro1 {...props} activeDotIndex={1} />}</Stack.Screen>
      <Stack.Screen name="Intro2">{(props) => <Intro2 {...props} activeDotIndex={2} />}</Stack.Screen>
      <Stack.Screen name="Intro3">{(props) => <Intro3 {...props} activeDotIndex={3} />}</Stack.Screen>
    </Stack.Navigator>
  );
}

// ⬇️ Registration Screens
function RegNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="RoleSelection" component={RoleSelection} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{title: 'Reset Password' }} />
      <Stack.Screen name="ProfilePicture" component={ProfilePicture} />
    </Stack.Navigator>
  );
}

// ⬇️ App Entry
export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="IntroFlow" component={IntroNavigator} />
        <RootStack.Screen name="RegFlow" component={RegNavigator} />
        <RootStack.Screen name="MainTabs" component={BottomTabs} options={{title: 'Back' }}  />
        <RootStack.Screen name="ServiceDetails" component={ServiceDetails} options={{ headerShown: true, title: 'Service Details' }} /> 
        <RootStack.Screen name="WorkshopDetails" component={WorkshopDetails} options={{ headerShown: true, title: 'WorkShop Details' }} />                    
        <RootStack.Screen name="Book" component={Book} options={{ headerShown: true, title: 'Confirm Booking' }} />
        <RootStack.Screen name="Payment" component={Payment} options={{ headerShown: true, title: 'Payment' }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
