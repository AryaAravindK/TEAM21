import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import { Stack } from 'expo-router'
import { Colors } from '../constants/Colors'

const RootLayout = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light

    return (
        <>
        <StatusBar value='auto'/>
    <Stack screenOptions={{
        headerStyle:{backgroundColor:theme.background},
        headerTintColor: theme.text
    }}>
        <Stack.Screen name='register' options={{ title:'Register', headerShown:false}}/>
        <Stack.Screen name='login' options={{ title:'Login'}}/>
        <Stack.Screen name='index' options={{ title:'Splash', headerShown:false}}/>
        <Stack.Screen name='(Auth)' options={{  headerShown:false}}/>
        <Stack.Screen name='(dashboard)' options={{  headerShown:false}}/>

    </Stack>
        </>
  )
}

export default RootLayout

const styles = StyleSheet.create({})