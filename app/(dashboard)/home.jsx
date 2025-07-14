import { StyleSheet,  } from 'react-native'
import React from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'

const home = () => {
  return (
    <ThemedView safe style={styles.container}>
      <ThemedText style={styles.heading}>home</ThemedText>
    </ThemedView>
  )
}

export default home

const styles = StyleSheet.create({
  container:{
    flex:1, 
    alignItem : 'center'
  },
  heading: {
    fontSize:20,
    textAlign: 'center'
  }

})