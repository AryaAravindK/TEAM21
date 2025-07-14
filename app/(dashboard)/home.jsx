import { StyleSheet, View, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar, Platform, useColorScheme } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'

const featuredEvents = [
  {
    id: 1,
    title: 'Basketball Tournament',
    date: '10 Aug',
    location: 'ABC Stadium, Tatguni, Agara, Bangalore - 560018',
    image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
]

const upcomingEvents = [
  {
    id: 1,
    title: 'City Basketball Tournament',
    date: 'May 10, 2025',
    time: '10:00 AM',
    location: 'ABC Stadium, Tatguni, Agara, Bangalore 560018',
    image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 2,
    title: 'City Basketball Tournament',
    date: 'May 15, 2025',
    time: '2:00 PM',
    location: 'XYZ Arena, Koramangala, Bangalore 560034',
    image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
]

const profileImg = 'https://randomuser.me/api/portraits/men/1.jpg'

const Home = () => {
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44
  const scheme = useColorScheme()
  const theme = Colors[scheme] ?? Colors.light

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      
      {/* Header with gradient background */}
      <View style={[styles.header, { paddingTop: statusBarHeight }]}>
        <Spacer height={20}></Spacer>
        <View style={styles.headerContent}>
          <View>
            <ThemedText style={styles.logoText}>Team21</ThemedText>
            <ThemedText style={styles.welcomeText}>Welcome, Arya</ThemedText>
          </View>
          <View style={styles.headerRight}>
            <Image source={{ uri: profileImg }} style={styles.profileImg} />
          </View>
        </View>
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
        {/* Featured Events */}
        <View style={styles.section}>
          <Spacer height={20}></Spacer>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Featured Events</ThemedText>
            <TouchableOpacity>
              <ThemedText style={[styles.viewAll, { color: theme.primary ?? Colors.primary }]}>View all</ThemedText>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredEvents.map((event) => (
              <TouchableOpacity 
                key={event.id} 
                style={styles.featuredCard}
                onPress={() => router.push('/eventDetails')}
              >
                <Image source={{ uri: event.image }} style={styles.featuredImage} />
                <View style={styles.featuredOverlay}>
                  <View style={styles.dateTag}>
                    <ThemedText style={styles.dateText}>{event.date}</ThemedText>
                  </View>
                  <View style={styles.featuredContent}>
                    <ThemedText style={styles.featuredTitle}>{event.title}</ThemedText>
                    <View style={styles.locationRow}>
                      <Ionicons name="location-outline" size={16} color="white" />
                      <ThemedText style={styles.featuredLocation}>{event.location}</ThemedText>
                    </View>
                    <TouchableOpacity 
                      style={styles.registerButton}
                      onPress={() => router.push('/registerEvent')}
                    >
                      <ThemedText style={styles.registerButtonText}>Register</ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Upcoming Events</ThemedText>
            <TouchableOpacity>
              <ThemedText style={[styles.viewAll, { color: theme.primary ?? Colors.primary }]}>View all</ThemedText>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {upcomingEvents.map((event) => (
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
                    style={[styles.eventRegisterButton, { backgroundColor: theme.primary ?? Colors.primary }]}
                    onPress={() => router.push('/registerEvent')}
                  >
                    <ThemedText style={styles.eventRegisterText}>Register</ThemedText>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1a1a2e',
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logoText: {
    fontFamily: 'cursive',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  welcomeText: {
    fontSize: 18,
    color: 'white',
    marginTop: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: 16,
  },
  horizontalScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  featuredCard: {
    width: 300,
    height: 200,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 16,
  },
  dateTag: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  dateText: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
  },
  featuredContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  featuredTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featuredLocation: {
    color: 'white',
    fontSize: 14,
    marginLeft: 4,
    flex: 1,
  },
  registerButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  registerButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  eventCard: {
    width: 280,
    marginRight: 16,
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
    height: 120,
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
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  eventDetails: {
    marginBottom: 16,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventDetailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  eventRegisterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  eventRegisterText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
})