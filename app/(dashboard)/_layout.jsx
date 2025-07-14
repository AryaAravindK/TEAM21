import { Tabs } from 'expo-router'
import { StyleSheet, useColorScheme, } from 'react-native'
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const DashboardLayout = () => {
  const scheme = useColorScheme();
  const theme = Colors[scheme] ?? Colors.light
  
  return (
    <Tabs
      screenOptions={{
        headerShown : false,
        tabBarStyle : {
          backgroundColor : theme.cardBackground,
          paddingTop: 10,
          height : 90
        },
        tabBarActiveTintColor: theme.iconColorFocused,
        tabBarInactiveTintColor: theme.iconColor
      }}
      >
        <Tabs.Screen 
          name='home'
          options={{
            title: "Home",
            tabBarIcon: ({focused}) => (
              <Ionicons 
                size={24}
                name={focused ? 'home' : 'home-outline'}
                color={focused ? theme.iconColorFocused : theme.iconColor}/>
            )
          }}
          />
        <Tabs.Screen 
          name='event'
          options={{
            title: "Events",
            tabBarIcon: ({focused}) => (
              <Ionicons 
                size={24}
                name={focused ? 'calendar-clear' : 'calendar-clear-outline'}
                color={focused ? theme.iconColorFocused : theme.iconColor}/>
            )
          }}
          />
        <Tabs.Screen 
          name='alerts'
          options={{
            title: "Alerts",
            tabBarIcon: ({focused}) => (
              <Ionicons 
                size={24}
                name={focused ? 'notifications' : 'notifications-outline'}
                color={focused ? theme.iconColorFocused : theme.iconColor}/>
            )
          }}
          />
        <Tabs.Screen 
          name='profile'
          options={{
            title: "Profile",
            tabBarIcon: ({focused}) => (
              <Ionicons 
                size={24}
                name={focused ? 'person' : 'person-outline'}
                color={focused ? theme.iconColorFocused : theme.iconColor}/>
            )
          }}
          />
        <Tabs.Screen 
          name='eventDetails'
          options={{
            title: "event details",
            tabBarIcon: ({focused}) => (
              <Ionicons 
                size={24}
                name={focused ? 'person' : 'person-outline'}
                color={focused ? theme.iconColorFocused : theme.iconColor}/>
            )
          }}
          />
      
        
    </Tabs>

  )
}

export default DashboardLayout

const styles = StyleSheet.create({})