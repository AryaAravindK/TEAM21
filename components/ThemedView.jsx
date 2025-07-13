import { View, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

const ThemedView = ({style , ...props}) => {
    const scheme = useColorScheme()
    const theme = Colors[scheme] ?? Colors.light

    return (
    <View 
        style={[{backgroundColor:theme.background}, style ]} 
        {...props}
    />
  )
}

export default ThemedView