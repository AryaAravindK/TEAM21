import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from './hooks/useAuth';
import api from '../lib/axios'
import { testApi } from './services/authService'

const Home = () => {
  const { user } = useAuth();

  useEffect(()=>{
    console.log("testing api ")
    try{
      const resp = testApi();

    }catch(error){
      console.log("error caught in index")
    }

  })

  const handleGetStarted = () => {
    if (user?.authenticated) {
      router.replace('/home');
    } else {
      router.replace('/login');
    }
  };

  return (
    <View style={styles.container}>
      {/* Circular Sports Icons Layout */}
      <View style={styles.circularLayout}>
        {/* Top */}
        <View style={[styles.iconContainer, styles.topIcon]}>
          <Text style={styles.sportIcon}>🏸</Text>
        </View>
        
        {/* Top Right */}
        <View style={[styles.iconContainer, styles.topRightIcon]}>
          <Text style={styles.sportIcon}>👤</Text>
        </View>
        
        {/* Right */}
        <View style={[styles.iconContainer, styles.rightIcon]}>
          <Text style={styles.sportIcon}>🎾</Text>
        </View>
        
        {/* Bottom Right */}
        <View style={[styles.iconContainer, styles.bottomRightIcon]}>
          <Text style={styles.sportIcon}>🏆</Text>
        </View>
        
        {/* Bottom */}
        <View style={[styles.iconContainer, styles.bottomIcon]}>
          <Text style={styles.sportIcon}>👤</Text>
        </View>
        
        {/* Bottom Left */}
        <View style={[styles.iconContainer, styles.bottomLeftIcon]}>
          <Text style={styles.sportIcon}>⚽</Text>
        </View>
        
        {/* Left */}
        <View style={[styles.iconContainer, styles.leftIcon]}>
          <Text style={styles.sportIcon}>♟️</Text>
        </View>
        
        {/* Top Left */}
        <View style={[styles.iconContainer, styles.topLeftIcon]}>
          <Text style={styles.sportIcon}>👤</Text>
        </View>
        
        {/* Center Logo */}
        <View style={styles.centerLogo}>
          <Text style={styles.logoText}>Team21</Text>
        </View>
      </View>

      {/* Title and Subtitle */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Team21</Text>
        <Text style={styles.subtitle}>Play. Compete.{'\n'}Connect.</Text>
      </View>

      {/* Get Started Button */}
      <Pressable style={styles.getStartedButton} onPress={handleGetStarted}>
        <Text style={styles.getStartedText}>Get Started</Text>
      </Pressable>

      {/* Bottom Indicator */}
      <View style={styles.bottomIndicator} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B8A9A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  circularLayout: {
    width: 280,
    height: 280,
    position: 'relative',
    marginBottom: 60,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'white',
  },
  topIcon: {
    top: 0,
    left: '50%',
    marginLeft: -30,
  },
  topRightIcon: {
    top: 40,
    right: 20,
  },
  rightIcon: {
    top: '50%',
    right: 0,
    marginTop: -30,
  },
  bottomRightIcon: {
    bottom: 40,
    right: 20,
  },
  bottomIcon: {
    bottom: 0,
    left: '50%',
    marginLeft: -30,
  },
  bottomLeftIcon: {
    bottom: 40,
    left: 20,
  },
  leftIcon: {
    top: '50%',
    left: 0,
    marginTop: -30,
  },
  topLeftIcon: {
    top: 40,
    left: 20,
  },
  centerLogo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -60,
    marginLeft: -60,
    borderWidth: 3,
    borderColor: 'white',
  },
  logoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sportIcon: {
    fontSize: 24,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    lineHeight: 32,
  },
  getStartedButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginBottom: 40,
    width: '80%',
    alignItems: 'center',
  },
  getStartedText: {
    color: '#1B8A9A',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomIndicator: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 2,
  },
});