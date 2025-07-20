import { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { router, Link } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer';
import { Colors } from '../../constants/Colors';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const { register } = useAuth();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async () => {
    if (!username.trim()) return setError('Username is required.');
    if (!email.trim()) return setError('Email is required.');
    if (!isValidEmail(email)) return setError('Enter a valid email address.');
    if (!password.trim()) return setError('Password is required.');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (password !== confirm) return setError('Passwords do not match.');

    setError('');

    try {
      await register({ username, email_id: email, password });
      router.replace(`/verify?email_id=${encodeURIComponent(email)}`);


    } catch (error) {
      console.log('Register error ->', error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView safe style={styles.container}>
        <Spacer height={20} />

        <ThemedText style={styles.title} title>Create an account</ThemedText>
        <ThemedText style={{ fontSize: 14 }}>Welcome! Please enter your details</ThemedText>
        <Spacer height={20} />

        <ThemedText title>Username</ThemedText>
        <TextInput placeholder="Enter your username" value={username} onChangeText={setUsername} style={styles.input} />
        <Spacer height={10} />

        <ThemedText title>Email</ThemedText>
        <TextInput placeholder="Enter your email" value={email} onChangeText={setEmail} style={styles.input} />
        <Spacer height={10} />

        <ThemedText title>Password</ThemedText>
        <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} style={styles.input} />
        <Spacer height={10} />

        <ThemedText title>Confirm Password</ThemedText>
        <TextInput placeholder="Re-enter Password" value={confirm} secureTextEntry onChangeText={setConfirm} style={styles.input} />
        <ThemedText>Must be at least 8 characters</ThemedText>
        <Spacer height={10} />

        {error && <Text style={styles.error}>{error}</Text>}
        <Spacer height={10} />

        <ThemedButton onPress={handleRegister}>
          <Text style={{ color: '#ffffff', textAlign: 'center' }}>Register</Text>
        </ThemedButton>

        <Spacer height={50} />
        <ThemedView style={styles.redirect}>
          <ThemedText style={{ fontSize: 20 }}>Already have an account </ThemedText>
          <Link href="/login" style={[{ color: Colors.primary }, styles.link]}>Login</Link>
        </ThemedView>
          <Link href="/verify" style={[{ color: Colors.primary }, styles.link]}>verify</Link>
      </ThemedView>
      
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    gap: 5,
    fontFamily: 'arial',
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
  redirect: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  link: {
    fontSize: 20,
  },
  error: {
    color: 'red',
    padding: 10,
    backgroundColor: '#f5c1c8',
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  },
});
