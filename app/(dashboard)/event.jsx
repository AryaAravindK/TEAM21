import { StyleSheet, View, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar, Platform, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'

const events = [
  {
    id: 1,
    title: 'City Basketball Tournament',
    date: 'May 10, 2025',
    time: '10:00 AM',
    location: 'ABC Stadium, Tatguni, Agara, Bangalore 560018',
    image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'City Basketball Tournament',
    date: 'May 15, 2025',
    time: '2:00 PM',
    location: 'ABC Stadium, Tatguni, Agara, Bangalore 560018',
    image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'City Basketball Tournament',
    date: 'April 28, 2025',
    time: '10:00 AM',
    location: 'Central Sports Arena',
    image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'past'
  }
]

const Event = () => {
  const [activeTab, setActiveTab] = useState('upcoming')
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44
  const scheme = useColorScheme()
  const theme = Colors[scheme] ?? Colors.light

  const filteredEvents = events.filter(event => event.status === activeTab)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: statusBarHeight, backgroundColor: theme.background }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.title} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Events</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      {/* Tab Buttons */}
      <View style={[styles.tabContainer, { backgroundColor: theme.background }]}>
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            activeTab === 'upcoming' && { backgroundColor: theme.primary ?? Colors.primary }
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <ThemedText style={[
            styles.tabText,
            activeTab === 'upcoming' && { color: 'white' }
          ]}>
            Upcoming
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tabButton,
            activeTab === 'past' && { backgroundColor: theme.primary ?? Colors.primary }
          ]}
          onPress={() => setActiveTab('past')}
        >
          <ThemedText style={[
            styles.tabText,
            activeTab === 'past' && { color: 'white' }
          ]}>
            Past Events
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Events List */}
      <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
        {filteredEvents.map((event) => (
          <TouchableOpacity 
            key={event.id}
            style={[styles.eventCard, { backgroundColor: theme.cardBackground }]}
            onPress={() => router.push('/eventDetails')}
          >
            <Image source={{ uri: event.image }} style={styles.eventImage} />
            <View style={styles.eventContent}>
              <View style={styles.eventHeader}>
                <ThemedText style={[styles.eventTitle, { color: theme.title }]}>{event.title}</ThemedText>
                <TouchableOpacity>
                  <Ionicons name="bookmark-outline" size={20} color={theme.text} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.eventDetails}>
                <View style={styles.eventDetailRow}>
                  <Ionicons name="calendar-outline" size={16} color={theme.text} />
                  <ThemedText style={styles.eventDetailText}>{event.date}</ThemedText>
                </View>
                <View style={styles.eventDetailRow}>
                  <Ionicons name="time-outline" size={16} color={theme.text} />
                  <ThemedText style={styles.eventDetailText}>{event.time}</ThemedText>
                </View>
                <View style={styles.eventDetailRow}>
                  <Ionicons name="location-outline" size={16} color={theme.text} />
                  <ThemedText style={styles.eventDetailText}>{event.location}</ThemedText>
                </View>
              </View>
              
              <TouchableOpacity 
                style={[styles.registerButton, { backgroundColor: theme.primary ?? Colors.primary }]}
                onPress={() => router.push('/registerEvent')}
              >
                <ThemedText style={styles.registerButtonText}>Register</ThemedText>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Event

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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  eventCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventImage: {
    width: '100%',
    height: 160,
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  eventDetails: {
    marginBottom: 16,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  eventDetailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  registerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
})