function BottomTabs({ route }) {
    const { role, profilePicture } = route.params || {}; // Receive the params passed from the previous screen
  
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
                     } else if (route.name === 'Search') {
                       iconName = focused ? 'search' : 'search-outline';
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
          children={() => <Home route={{ params: { role, profilePicture } }} />}
        />
        <Tab.Screen name="Search" component={Search} />
        
        
        <Tab.Screen name="CurrentBooking" component={CurrentBookingScreen} options={{ title: 'Current Booking' }} />
        <Tab.Screen name="Profile" component={ProfileNavigator} />
        
      </Tab.Navigator>
    );
  }
  