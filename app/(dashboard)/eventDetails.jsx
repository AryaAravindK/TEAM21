import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'

const eventDetails = () => {
  return (
    <ThemedView safe style={styles.container}>
      <ThemedText style={styles.heading}>Event Details</ThemedText>
    </ThemedView>
  )
}

export default eventDetails

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