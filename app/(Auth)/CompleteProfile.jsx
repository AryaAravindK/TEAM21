import { useState } from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';
import axios from '../../lib/axios';
import { router } from 'expo-router';

import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';

export default function CompleteProfile() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleComplete = async () => {
    try {
      const res = await axios.post('/complete-profile', { name, phone, address });
      if (res.data.success) {
        router.push('/home');
      } else setError(res.data.message);
    } catch {
      setError('Server error');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Spacer height={20} />

      <ThemedText style={styles.title} title>Complete Profile</ThemedText>
      <ThemedText style={{ fontSize: 14 }}>Tell us a bit about you</ThemedText>
      <Spacer height={20} />

      <ThemedText title>Name</ThemedText>
      <TextInput placeholder="Full Name" value={name} onChangeText={setName} style={styles.input} />
      <Spacer height={10} />

      <ThemedText title>Phone</ThemedText>
      <TextInput placeholder="Phone Number" value={phone} keyboardType='phone-pad' onChangeText={setPhone} style={styles.input} />
      <Spacer height={10} />

      <ThemedText title>Address</ThemedText>
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />
      <Spacer height={10} />

      {error ? <ThemedText style={{ color: 'red' }}>{error}</ThemedText> : null}
      <Spacer height={10} />

      <ThemedButton onPress={handleComplete}><Text style={{ color: '#ffffff', textAlign: 'center' }}>Finish</Text></ThemedButton>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'top', padding: 10 },
  title: { fontWeight: 'bold', fontSize: 26 },
  input: { borderWidth: 1, borderRadius: 10, borderColor: '#888888', padding: 10 },
});
