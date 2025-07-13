import { StyleSheet,  } from 'react-native'
import React from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'

const home = () => {
  return (
    <ThemedView style={{flex:1, justifyContent: 'center', alignItem : 'center'}}>
      <ThemedText style={{fontSize:20,textAlign: 'center'}}>home</ThemedText>
    </ThemedView>
  )
}

export default home

const styles = StyleSheet.create({})