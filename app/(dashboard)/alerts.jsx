import { StyleSheet, View, TouchableOpacity, ScrollView, Image, SafeAreaView, StatusBar, Platform, useColorScheme } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Colors'

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'

const notifications = [
  {
    id: 1,
    title: 'New Event Registration',
    description: 'Successfully registered for city basketball tournamnet',
    time: '10 mins ago',
    read: false,
  },
  {
    id: 2,
    title: 'New Event Registration',
    description: 'Successfully registered for city basketball tournamnet',
    time: '10 mins ago',
    read: false,
  },
  {
    id: 3,
    title: 'New Event Registration',
    description: 'Successfully registered for city basketball tournamnet',
    time: '10 mins ago',
    read: false,
  },
  {
    id: 4,
    title: 'New Event Registration',
    description: 'Successfully registered for city basketball tournamnet',
    time: '10 mins ago',
    read: false,
  },
  {
    id: 5,
    title: 'New Event Registration',
    description: 'Successfully registered for city basketball tournamnet',
    time: '10 mins ago',
    read: false,
  },
  {
    id: 6,
    title: 'New Event Registration',
    description: 'Successfully registered for city basketball tournamnet',
    time: '10 mins ago',
    read: false,
  },
  {
    id: 7,
    title: 'New Event Registration',
    description: 'Successfully registered for city basketball tournamnet',
    time: '10 mins ago',
    read: false,
  },
  {
    id: 8,
    title: 'New Event Registration',
    description: 'Successfully registered for city basketball tournamnet',
    time: '10 mins ago',
    read: false,
  },
  {
    id: 9,
    title: 'New Event Registration',
    description: 'Successfully registered for city basketball tournamnet',
    time: '10 mins ago',
    read: false,
  },
]

const profileImg = 'https://randomuser.me/api/portraits/men/1.jpg'

const Alerts = () => {
  const navigation = useNavigation()
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44
  const scheme = useColorScheme();
  const theme = Colors[scheme] ?? Colors.light;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.cardBackground} />
      {/*-------------------------------------------- Header Bar------------------------------ */}
      <View style={[styles.headerBar, { paddingTop: statusBarHeight, backgroundColor: theme.cardBackground, borderBottomColor: theme.background }]}>
        <View style={styles.headerLeft}>
          <ThemedText style={[styles.logoText, { color: theme.primary ?? Colors.primary }]}>Team21</ThemedText>
        </View>
        <View style={styles.headerRight}>
          <Image source={{ uri: profileImg }} style={styles.profileImg} />
        </View>
      </View>
      {/*------------------- Sub-header with back arrow and title -----------------------------*/}
      <View style={[styles.subHeader, { backgroundColor: theme.background, borderBottomColor: theme.cardBackground }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrowContainer}>
          <ThemedText style={[styles.backArrow, { color: theme.primary ?? Colors.primary }]}> {'\u2190'} </ThemedText>
        </TouchableOpacity>
        <ThemedText style={[styles.notificationsTitle, { color: theme.title }]}>Notifications</ThemedText>
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
        {notifications.map((notif, idx) => (
          <View
            key={notif.id}
            style={[
              styles.notificationBox,
              {
                backgroundColor: theme.background,
                borderBottomColor: theme.cardBackground,
                borderTopWidth: idx === 0 ? 1 : 0,
                borderTopColor: theme.cardBackground,
              },
            ]}
          >

            <View style={styles.iconContainer}>
              <Image
                source={require('../../assets/bell.png')}
                style={[styles.bellIcon, { width: 28, height: 28 }]}
                resizeMode="contain"
              />
            </View>

            <View style={styles.textContainer}>
              <View style={styles.titleRow}>
                <ThemedText style={[styles.title, { color: theme.title }]}>New Event Registration</ThemedText>
                <TouchableOpacity>
                  <ThemedText style={[styles.markAsRead, { color: theme.primary ?? Colors.primary }]}>Mark as read</ThemedText>
                </TouchableOpacity>
              </View>
              <ThemedText style={[styles.description, { color: theme.text }]}>{notif.description}</ThemedText>
              <ThemedText style={[styles.time, { color: '#888' }]}>{notif.time}</ThemedText>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Alerts

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'cursive',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 8,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backArrowContainer: {
    marginRight: 8,
    padding: 4,
  },
  backArrow: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  notificationsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    minHeight: 90,
  },
  iconContainer: {
    marginRight: 14,
    marginTop: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  bellIcon: {
    fontSize: 32,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    marginTop: 2,
  },
  time: {
    fontSize: 13,
    marginTop: 2,
  },
  markAsRead: {
    fontSize: 15,
    marginLeft: 0,
    marginTop: 2,
  },
})