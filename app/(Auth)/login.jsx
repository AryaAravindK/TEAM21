import { View, Text, StyleSheet,SafeAreaView } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'

const login = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.title,{fontSize:20}]}>login page</ThemedText>
      <Link href='/register'style={{color:'#888', fontSize:14}}>Register page</Link>
      <Link href='/'style={{color:'#888', fontSize:14}}>home page</Link>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        gap:20
    },
      title:{
    fontWeight:'bold',
    fontSize:26,
    color:'#151515',
  },
})

export default login