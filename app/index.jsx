import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Logo from '../assets/Trophy.png';
import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from './hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user?.authenticated) {
        router.replace('/home');
      } else {
        router.replace('/login');
      }
    }, 1000); 

    return () => clearTimeout(timeout);
  }, [user?.authenticated]); 
  return (
    <Pressable style={styles.container} onPress={() => {
      if (user?.authenticated) {
        router.replace('/(dashboard)');
      } else {
        router.replace('/(login)');
      }
    }}> 
      <Image source={Logo} />
      <Text style={styles.title}>Team21</Text>
    </Pressable>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
