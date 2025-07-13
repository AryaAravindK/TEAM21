import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Pressable } from 'react-native';
import axios from '../../lib/axios';
import { router,Link } from 'expo-router';
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer';
import { Colors } from '../../constants/Colors';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (password !== confirm) return setError('Passwords do not match');
    try {
      // const res = await axios.post('/register', { email, password });
      // if (res.data.success) {
      //   router.push({ pathname: '/verify', params: { email } });
      // } else setError(res.data.message);
      router.replace('/verify')
    } catch {
      setError('Server error');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Spacer height={90}></Spacer>

      <ThemedText style={styles.title} title>Create an account</ThemedText>
      <ThemedText style={{fontSize:14}}>Welcome! please enter your details</ThemedText>
      <Spacer height={20}></Spacer>

      <ThemedText title>Email</ThemedText>
      <TextInput placeholder="Enter you email" value={email} onChangeText={setEmail} style={styles.input} />
      <Spacer height={10}/>

      <ThemedText title>Password</ThemedText>
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} style={styles.input} />
      <Spacer height={10}/>

      <ThemedText title>Confirm Password</ThemedText>
      <TextInput placeholder="Re-enter Password" value={confirm} secureTextEntry onChangeText={setConfirm} style={styles.input} />
      <ThemedText>Must be atleast 8 characters</ThemedText>
      <Spacer height={10}/>
      
      {error ? <ThemedText style={{ color: 'red' }}>{error}</ThemedText> : null}
      <Spacer height={10}/>

      <ThemedButton onPress = {handleRegister}><Text style={{color:'#ffffff',textAlign:'center'}}>Register</Text></ThemedButton>
      <Spacer height={50}/>

      <ThemedView style={styles.redirect}>
        <ThemedText style={{fontSize:20}}>Already have an account </ThemedText>
        <Link href="/login" style={[{color:Colors.primary},styles.link]}>Login</Link>
      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 10,
    gap:5,
    fontFamily:'arial',
    },
  title:{
    fontWeight:'bold',
    fontSize:26,
  },
  input: { 
    borderWidth: 1, 
    borderRadius: 10,
    borderColor:'#888888',
    padding: 10
  },
  redirect:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'stretch'
  },
  link:{
    fontSize:20,
  }

});
