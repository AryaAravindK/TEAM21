import { Tabs } from 'expo-router'
import { StyleSheet, useColorScheme, } from 'react-native'
import { Colors } from '../../constants/Colors';

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
        }
      }}
      >

        
    </Tabs>

  )
}

export default DashboardLayout

const styles = StyleSheet.create({})