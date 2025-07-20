import { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import axios from '../../lib/axios';
import { router,Link } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import { useLocalSearchParams } from "expo-router";

import { verifyAccount } from '../services/authService'
import Colors from '../../constants/Colors'

export default function Verify() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const params = useLocalSearchParams();
  const [ login ] = useAuth();


  console.log('Local search params:', params);
  const email_id = params.email_id;

  const handleVerify = async () => {
    try {
      const verification_code = otp
      console.log("verification body:",{email_id, verification_code})
      const resp =await verifyAccount({email_id, verification_code})
      console.log(resp.data)

      router.replace('/login')
    } catch (error) {
      console.log('verify error ->', error.response.data.message);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Spacer height={40} />

      <ThemedText style={styles.title} title>Email Verification</ThemedText>
      <ThemedText style={{ fontSize: 14 }}>Please enter the OTP sent to your email</ThemedText>
      <Spacer height={20} />

      <ThemedText title>OTP Code</ThemedText>
      <TextInput placeholder="Enter OTP" value={otp} onChangeText={setOtp} style={styles.input} />
      <Spacer height={10} />

      {error ? <ThemedText style={{ color: 'red' }}>{error}</ThemedText> : null}
      <Spacer height={10} />

      <ThemedButton onPress={handleVerify}><Text style={{ color: '#ffffff', textAlign: 'center' }}>Verify</Text></ThemedButton>
      <Spacer height={40} />
      <Link href="/CompleteProfile" style={[{ color: '#2F4F9A' }]}>completeProfile</Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 10 },
  title: { fontWeight: 'bold', fontSize: 26 },
  input: { borderWidth: 1, borderRadius: 10, borderColor: '#888888', padding: 10 },
});
