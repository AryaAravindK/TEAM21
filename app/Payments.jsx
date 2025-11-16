import {
  StyleSheet,
  View,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '../constants/Colors';
import { getQrCode, uploadPaymentScreenshot } from './services/paymentService';
import ThemedText from '../components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Payments = () => {
  const { event_id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [screenshot, setScreenshot] = useState(null);

  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;

  useEffect(() => {
    fetchQrCode();
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to upload screenshots!');
      }
    }
  };

  const fetchQrCode = async () => {
    try {
      setLoading(true);
      console.log("event_id",event_id)
      const response = await getQrCode(event_id);
      setQrData(response);
    } catch (error) {
      console.error('Error fetching QR code:', error);
      Alert.alert('Error', 'Failed to load payment details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setScreenshot(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (!screenshot) {
      Alert.alert('No Screenshot', 'Please upload a payment screenshot before submitting.');
      return;
    }

    try {
      setUploading(true);
      await uploadPaymentScreenshot(event_id, screenshot);
      Alert.alert(
        'Success',
        'Payment screenshot submitted successfully! Your payment will be verified shortly.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      console.error('Error uploading screenshot:', error);
      Alert.alert('Error', error.message || 'Failed to upload screenshot. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <ThemedText style={styles.loadingText}>Loading payment details...</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.registerBackground} />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: statusBarHeight }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Payment</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Event Details Card */}
        <View style={styles.eventCard}>
          <ThemedText style={styles.eventName}>{qrData?.eventName}</ThemedText>
          <View style={styles.amountContainer}>
            <ThemedText style={styles.amountLabel}>Amount to Pay</ThemedText>
            <ThemedText style={styles.amount}>₹{qrData?.amount}</ThemedText>
          </View>
        </View>

        {/* QR Code Section */}
        <View style={styles.qrSection}>
          <ThemedText style={styles.sectionTitle}>Scan QR Code to Pay</ThemedText>
          <View style={styles.qrContainer}>
            {qrData?.qrURL ? (
              <Image 
                source={{ uri: qrData.qrURL }} 
                style={styles.qrImage}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.qrPlaceholder}>
                <Ionicons name="qr-code-outline" size={100} color="#ccc" />
                <ThemedText style={styles.placeholderText}>QR Code not available</ThemedText>
              </View>
            )}
          </View>
          <ThemedText style={styles.instructions}>
            Open your UPI app and scan this QR code to complete the payment
          </ThemedText>
        </View>

        {/* Upload Screenshot Section */}
        <View style={styles.uploadSection}>
          <ThemedText style={styles.sectionTitle}>Upload Payment Screenshot</ThemedText>
          
          {screenshot ? (
            <View style={styles.screenshotPreview}>
              <Image 
                source={{ uri: screenshot.uri }} 
                style={styles.previewImage}
                resizeMode="cover"
              />
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => setScreenshot(null)}
              >
                <Ionicons name="close-circle" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Ionicons name="cloud-upload-outline" size={48} color={Colors.primary} />
              <ThemedText style={styles.uploadButtonText}>Tap to upload screenshot</ThemedText>
              <ThemedText style={styles.uploadHint}>JPG, PNG (Max 5MB)</ThemedText>
            </TouchableOpacity>
          )}
        </View>

        {/* Submit Button */}
        <Pressable 
          style={[
            styles.submitButton, 
            (!screenshot || uploading) && styles.submitButtonDisabled
          ]} 
          onPress={handleSubmit}
          disabled={!screenshot || uploading}
        >
          {uploading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <ThemedText style={styles.submitButtonText}>Submit Payment Proof</ThemedText>
          )}
        </Pressable>

        {/* Note */}
        <View style={styles.noteContainer}>
          <Ionicons name="information-circle-outline" size={20} color="#666" />
          <ThemedText style={styles.noteText}>
            Your payment will be verified within 24 hours. You'll receive a confirmation once approved.
          </ThemedText>
        </View>
      </ScrollView>
    </View>
  );
};

export default Payments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.registerBackground,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  amountLabel: {
    fontSize: 16,
    color: '#666',
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  qrSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  qrContainer: {
    width: 250,
    height: 250,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  qrImage: {
    width: 230,
    height: 230,
  },
  qrPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 12,
    fontSize: 14,
    color: '#999',
  },
  instructions: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  uploadSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
  },
  uploadHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  screenshotPreview: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  removeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  noteContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    lineHeight: 20,
  },
});