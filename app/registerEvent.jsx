import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Platform, useColorScheme, Alert } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'

import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedButton from '../components/ThemedButton'

const eventData = {
  title: 'City Basketball Tournament',
  date: 'May 10, 2025',
  time: '10:00 AM',
  location: 'ABC Stadium, Tatguni, Agara, Bangalore 560018',
  price: '₹500'
}

const RegisterEvent = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Credit Card')
  const [agreeTerms, setAgreeTerms] = useState(false)
  
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44
  const scheme = useColorScheme()
  const theme = Colors[scheme] ?? Colors.light

  const handleContinue = () => {
    if (!fullName || !email || !phone || !agreeTerms) {
      Alert.alert('Error', 'Please fill all fields and agree to terms')
      return
    }
    
    Alert.alert('Success', 'Registration submitted successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ])
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
      
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: statusBarHeight, backgroundColor: theme.background }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={theme.title} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Register Event</ThemedText>
          <View style={{ width: 24 }} />
        </View>

        {/* Event Info */}
        <View style={[styles.eventInfoContainer, { backgroundColor: theme.cardBackground }]}>
          <ThemedText style={[styles.eventTitle, { color: theme.title }]}>{eventData.title}</ThemedText>
          
          <View style={styles.eventDetails}>
            <View style={styles.eventDetailRow}>
              <Ionicons name="calendar-outline" size={20} color={theme.text} />
              <ThemedText style={styles.eventDetailText}>{eventData.date}</ThemedText>
            </View>
            
            <View style={styles.eventDetailRow}>
              <Ionicons name="time-outline" size={20} color={theme.text} />
              <ThemedText style={styles.eventDetailText}>{eventData.time}</ThemedText>
            </View>
            
            <View style={styles.eventDetailRow}>
              <Ionicons name="location-outline" size={20} color={theme.text} />
              <ThemedText style={styles.eventDetailText}>{eventData.location}</ThemedText>
            </View>
            
            <View style={styles.eventDetailRow}>
              <Ionicons name="card-outline" size={20} color={theme.text} />
              <ThemedText style={styles.eventDetailText}>{eventData.price}</ThemedText>
            </View>
          </View>
        </View>

        {/* Registration Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <ThemedText style={[styles.label, { color: theme.title }]}>Full Name</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: theme.cardBackground, color: theme.title, borderColor: '#ddd' }]}
              placeholder="Enter your full name"
              placeholderTextColor="#999"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={[styles.label, { color: theme.title }]}>Email</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: theme.cardBackground, color: theme.title, borderColor: '#ddd' }]}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={[styles.label, { color: theme.title }]}>Phone Number</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: theme.cardBackground, color: theme.title, borderColor: '#ddd' }]}
              placeholder="Enter your Phone Number"
              placeholderTextColor="#999"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={[styles.label, { color: theme.title }]}>Payment Method</ThemedText>
            <TouchableOpacity style={[styles.input, styles.paymentInput, { backgroundColor: theme.cardBackground, borderColor: '#ddd' }]}>
              <ThemedText style={[styles.paymentText, { color: theme.title }]}>{paymentMethod}</ThemedText>
              <Ionicons name="chevron-down" size={20} color={theme.text} />
            </TouchableOpacity>
          </View>

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <TouchableOpacity 
              style={styles.checkbox}
              onPress={() => setAgreeTerms(!agreeTerms)}
            >
              <View style={[styles.checkboxInner, agreeTerms && { backgroundColor: theme.primary ?? Colors.primary }]}>
                {agreeTerms && <Ionicons name="checkmark" size={16} color="white" />}
              </View>
            </TouchableOpacity>
            <ThemedText style={styles.termsText}>
              I agree to the T & C and understand the event registration policy
            </ThemedText>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={[styles.buttonContainer, { backgroundColor: theme.cardBackground }]}>
        <TouchableOpacity 
          style={[styles.continueButton, { backgroundColor: theme.primary ?? Colors.primary }]}
          onPress={handleContinue}
        >
          <ThemedText style={styles.continueButtonText}>Continue</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.cancelButton, { borderColor: theme.primary ?? Colors.primary }]}
          onPress={handleCancel}
        >
          <ThemedText style={[styles.cancelButtonText, { color: theme.primary ?? Colors.primary }]}>Cancel</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RegisterEvent

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  eventInfoContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  eventDetails: {
    gap: 8,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDetailText: {
    fontSize: 16,
    marginLeft: 12,
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  paymentInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    gap: 12,
  },
  continueButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})