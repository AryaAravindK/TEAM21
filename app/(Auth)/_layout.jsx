import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '../../constants/Colors'

const AuthLayout = () => {
    const Scheme = useColorScheme()
    const theme = Colors[Scheme] ?? Colors.light
  return (
    <>
    <StatusBar value='auto'/>
    <Stack screenOptions={{
        headerStyle:{backgroundColor:theme.background},
        headerTintColor: theme.text
    }}>
    <Stack.Screen name='login' options={{headerShown : false}}/>
        <Stack.Screen name='register' options={{headerShown : false}}/>
    </Stack>
  </>
  )
}

export default AuthLayout
