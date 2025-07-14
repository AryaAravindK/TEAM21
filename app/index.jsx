import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import Logo from '../assets/Trophy.png'
import React from 'react'

import { useEffect } from 'react';
import { router } from 'expo-router';


useEffect(() => {
  setTimeout(() => {
    router.replace('/register');
  }, 2000);
}, []);

const handleRedirect = () =>{
  router.replace('/register')
}

const Home = () => {
  return (
    <>
    <Pressable style={styles.container} onPress={handleRedirect}> 
      <Image source={Logo}></Image>
      <Text style={styles.title}>Team21</Text>
    </Pressable>

    </>
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