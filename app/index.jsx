import { StyleSheet, Text, View, Image } from 'react-native'
import Logo from '../assets/Trophy.png'
import React from 'react'

import { useEffect } from 'react';
import { router } from 'expo-router';

useEffect(() => {
  setTimeout(() => {
    router.replace('/register');
  }, 1000);
}, []);

const Home = () => {
  return (
    <View style={styles.container}>
        <Image source={Logo}></Image>
      <Text style={styles.title}>Team21</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        fontWeight:'bold',
        fontSize:18,
    }
})