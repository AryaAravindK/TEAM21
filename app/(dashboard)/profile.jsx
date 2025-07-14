import { StyleSheet,  } from 'react-native'
import React from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'

import { Link } from 'expo-router'

const profile = () => {
  return (
    <ThemedView safe style={styles.container}>
      <ThemedText style={styles.heading}>profile</ThemedText>
      <Link href='/login'>Login</Link>
      <Link href='/register'>register</Link>
    </ThemedView>
  )
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex:1, 
    alignItem : 'center'
  },
  heading:{
    fontSize:20,
    textAlign: 'center'
  }
})