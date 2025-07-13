import { StyleSheet } from 'react-native'
import React from 'react'

import ThemedView from '../../components/ThemedView'
import ThemedText   from '../../components/ThemedText'

const alerts = () => {
  return (
    <ThemedView style={{flex:1, justifyContent: 'center', alignItem : 'center'}}>
      <ThemedText style={{fontSize:20,textAlign: 'center'}}>event</ThemedText>
    </ThemedView>
  )
}

export default alerts

const styles = StyleSheet.create({})