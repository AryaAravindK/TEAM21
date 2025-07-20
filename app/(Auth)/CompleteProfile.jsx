import { useState } from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';

import { updateUser } from '../services/authService';  // ✅ Correct import

export default function CompleteProfile() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [interests, setInterests] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleComplete = async () => {
    try {
      const res = await updateUser({
        firstname,
        lastname,
        gender,
        age,
        interests,
        phone,
      });
      console.log(res.data);
      router.replace('/dashboard');
    } catch (err) {
      console.log(err);
      setError('Server error or invalid input');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Spacer height={20} />
      <ThemedText style={styles.title} title>Complete Profile</ThemedText>
      <ThemedText style={{ fontSize: 14 }}>Tell us a bit about you</ThemedText>
      <Spacer height={20} />

      <ThemedText title>First Name</ThemedText>
      <TextInput placeholder="First Name" value={firstname} onChangeText={setFirstname} style={styles.input} />
      <Spacer height={10} />

      <ThemedText title>Last Name</ThemedText>
      <TextInput placeholder="Last Name" value={lastname} onChangeText={setLastname} style={styles.input} />
      <Spacer height={10} />

      <ThemedText title>Gender</ThemedText>
      <TextInput placeholder="Gender" value={gender} onChangeText={setGender} style={styles.input} />
      <Spacer height={10} />

      <ThemedText title>Age</ThemedText>
      <TextInput placeholder="Age" value={age} onChangeText={setAge} style={styles.input} keyboardType="numeric" />
      <Spacer height={10} />

      <ThemedText title>Interests</ThemedText>
      <TextInput placeholder="Interests" value={interests} onChangeText={setInterests} style={styles.input} />
      <Spacer height={10} />

      <ThemedText title>Phone</ThemedText>
      <TextInput placeholder="Phone Number" value={phone} keyboardType='phone-pad' onChangeText={setPhone} style={styles.input} />
      <Spacer height={10} />

      {error ? <ThemedText style={{ color: 'red' }}>{error}</ThemedText> : null}
      <Spacer height={10} />

      <ThemedButton onPress={handleComplete}>
        <Text style={{ color: '#ffffff', textAlign: 'center' }}>Finish</Text>
      </ThemedButton>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#888888',
    padding: 10,
  },
});
