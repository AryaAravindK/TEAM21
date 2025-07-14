import { StyleSheet, View, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar, Platform, useColorScheme } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'

const profileData = {
  name: 'Arya Khaded, 21',
  profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
  completionPercentage: '20% Complete',
  participations: 12,
  achievements: 8
}

const participationHistory = [
  {
    id: 1,
    title: 'City Basketball Tournament',
    date: 'April 28, 2025',
    venue: 'Central Sports Arena',
    result: 'Semi - finalist',
    status: 'Completed'
  },
  {
    id: 2,
    title: 'City Basketball Tournament',
    date: 'April 29, 2025',
    venue: 'Central Sports Arena',
    result: 'Semi - finalist',
    status: 'Completed'
  },
  {
    id: 3,
    title: 'City Basketball Tournament',
    date: 'April 29, 2025',
    venue: 'Central Sports Arena',
    result: 'Semi - finalist',
    status: 'Completed'
  }
]

const Profile = () => {
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44
  const scheme = useColorScheme()
  const theme = Colors[scheme] ?? Colors.light

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: statusBarHeight, backgroundColor: theme.background }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.title} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Profile</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
        {/* Profile Section */}
        <View style={[styles.profileSection, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
            <View style={styles.completionBadge}>
              <ThemedText style={styles.completionText}>{profileData.completionPercentage}</ThemedText>
            </View>
          </View>
          
          <ThemedText style={[styles.profileName, { color: theme.title }]}>{profileData.name}</ThemedText>
          
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil-outline" size={16} color={theme.title} />
            <ThemedText style={[styles.editButtonText, { color: theme.title }]}>Edit Profile</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={[styles.statsSection, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <Ionicons name="ribbon-outline" size={32} color={theme.title} />
            </View>
            <ThemedText style={[styles.statNumber, { color: theme.title }]}>{profileData.participations}</ThemedText>
            <ThemedText style={styles.statLabel}>Participations</ThemedText>
          </View>
          
          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <Ionicons name="trophy-outline" size={32} color={theme.title} />
            </View>
            <ThemedText style={[styles.statNumber, { color: theme.title }]}>{profileData.achievements}</ThemedText>
            <ThemedText style={styles.statLabel}>Achievements</ThemedText>
          </View>
        </View>

        {/* Participation History */}
        <View style={styles.historySection}>
          <View style={styles.historySectionHeader}>
            <ThemedText style={[styles.historySectionTitle, { color: theme.title }]}>Participation History</ThemedText>
            <TouchableOpacity>
              <ThemedText style={[styles.viewAll, { color: theme.primary ?? Colors.primary }]}>View all</ThemedText>
            </TouchableOpacity>
          </View>
          
          {participationHistory.map((item) => (
            <View key={item.id} style={[styles.historyItem, { backgroundColor: theme.cardBackground }]}>
              <View style={styles.historyContent}>
                <ThemedText style={[styles.historyTitle, { color: theme.title }]}>{item.title}</ThemedText>
                
                <View style={styles.historyDetails}>
                  <View style={styles.historyDetailRow}>
                    <Ionicons name="calendar-outline" size={16} color={theme.text} />
                    <ThemedText style={styles.historyDetailText}>{item.date}</ThemedText>
                  </View>
                  
                  <View style={styles.historyDetailRow}>
                    <Ionicons name="location-outline" size={16} color={theme.text} />
                    <ThemedText style={styles.historyDetailText}>{item.venue}</ThemedText>
                  </View>
                  
                  <View style={styles.historyDetailRow}>
                    <Ionicons name="medal-outline" size={16} color={theme.text} />
                    <ThemedText style={styles.historyDetailText}>{item.result}</ThemedText>
                  </View>
                </View>
              </View>
              
              <View style={styles.statusContainer}>
                <ThemedText style={[styles.statusText, { color: '#4CAF50' }]}>{item.status}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

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
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  completionBadge: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    backgroundColor: '#2F4F9A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    marginLeft: 8,
    fontSize: 16,
  },
  statsSection: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    paddingVertical: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  historySection: {
    paddingHorizontal: 16,
  },
  historySectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  historySectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: 16,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  historyDetails: {
    gap: 4,
  },
  historyDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyDetailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  statusContainer: {
    marginLeft: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
})