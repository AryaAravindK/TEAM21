import { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import axios from '../../lib/axios';
import { router } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';

export default function Verify() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async () => {
    try {
      // const res = await axios.post('/verify', { otp });
      // if (res.data.success) {
      //   router.push('/CompleteProfile');
      // } else setError(res.data.message);
      router.replace('/CompleteProfile')
    } catch {
      setError('Server error');
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 10 },
  title: { fontWeight: 'bold', fontSize: 26 },
  input: { borderWidth: 1, borderRadius: 10, borderColor: '#888888', padding: 10 },
});
