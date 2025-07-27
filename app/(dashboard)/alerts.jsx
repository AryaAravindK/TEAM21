import { StyleSheet, View, TouchableOpacity, ScrollView, Image, SafeAreaView, StatusBar, Platform, useColorScheme, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Colors'
import { getAlerts } from '../services/alertService'

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'

const profileImg = 'https://randomuser.me/api/portraits/men/1.jpg'

const Alerts = () => {
  const navigation = useNavigation()
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44
  const scheme = useColorScheme();
  const theme = Colors[scheme] ?? Colors.light;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await getAlerts();
      setNotifications(response.data || []);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'registration':
        return require('../../assets/bell.png');
      case 'invitation':
        return require('../../assets/bell.png');
      case 'reminder':
        return require('../../assets/bell.png');
      case 'achievement':
        return require('../../assets/Trophy.png');
      case 'update':
        return require('../../assets/bell.png');
      default:
        return require('../../assets/bell.png');
    }
  };

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
          <ThemedText style={[styles.backArrow, { color: theme.primary }]}> {'\u2190'} </ThemedText>
        </TouchableOpacity>
        <ThemedText style={[styles.notificationsTitle, { color: theme.title }]}>Notifications</ThemedText>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <ThemedText style={[styles.loadingText, { color: theme.text }]}>Loading notifications...</ThemedText>
        </View>
      ) : (
        <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
          {notifications.length === 0 ? (
            <View style={styles.emptyContainer}>
              <ThemedText style={[styles.emptyText, { color: theme.text }]}>No notifications yet</ThemedText>
            </View>
          ) : (
            notifications.map((notif, idx) => (
              <View
                key={notif.id}
                style={[
                  styles.notificationBox,
                  {
                    backgroundColor: notif.read ? theme.background : theme.cardBackground,
                    borderBottomColor: theme.secondary,
                    borderTopWidth: idx === 0 ? 1 : 0,
                    borderTopColor: theme.secondary,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 2,
                  },
                ]}
              >
                <View style={styles.iconContainer}>
                  <Image
                    source={getAlertIcon(notif.type)}
                    style={[styles.bellIcon, { 
                      width: 32, 
                      height: 32,
                      tintColor: notif.read ? theme.text : theme.primary
                    }]}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.textContainer}>
                  <ThemedText style={[
                    styles.title, 
                    { 
                      color: notif.read ? theme.text : theme.title,
                      fontWeight: notif.read ? 'normal' : 'bold'
                    }
                  ]}>
                    {notif.title}
                  </ThemedText>
                  <ThemedText style={[
                    styles.description, 
                    { 
                      color: theme.text,
                      opacity: notif.read ? 0.7 : 1
                    }
                  ]}>
                    {notif.description}
                  </ThemedText>
                  <ThemedText style={[styles.time, { color: '#888' }]}>{notif.time}</ThemedText>
                </View>

                {!notif.read && (
                  <View style={[styles.unreadIndicator, { backgroundColor: theme.primary }]} />
                )}
              </View>
            ))
          )}
        </ScrollView>
      )}
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
    paddingBottom: 12,
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backArrowContainer: {
    marginRight: 12,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    opacity: 0.6,
  },
  notificationBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    minHeight: 100,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 12,
    position: 'relative',
  },
  iconContainer: {
    marginRight: 16,
    marginTop: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  bellIcon: {
    fontSize: 32,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 8,
  },
  time: {
    fontSize: 13,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
})