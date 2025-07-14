import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from '../../lib/axios';
import { router,Link } from 'expo-router';
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer';
import { Colors } from '../../constants/Colors';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import ThemedTextInput from '../../components/ThemedTextInput';

import { useUser } from '../hooks/useUser';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const { user, login } = useUser()


  const handleLogin = async () => {
    try {
      await login(email,password)
      console.log("Attepmt to login",email,password)
      setTimeout(() => {
        router.replace('/home')
      }, 1000);
    } catch (error) {
       setError(error.message)
    }
    
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    
    <ThemedView safe style={styles.container}>
      <Spacer height={20}></Spacer>

      <ThemedText style={styles.title} title>Login</ThemedText>
      <ThemedText style={{fontSize:14}}>Welcome back! please enter your details</ThemedText>
      <Spacer height={20}></Spacer>

      <ThemedText title>Email</ThemedText>
      <ThemedTextInput 
        placeholder="Enter you email" 
        value={email} 
        keyboardType='email-address'
        onChangeText={setEmail} 
        />
      <Spacer height={10}/>

      <ThemedText title>Password</ThemedText>
      <ThemedTextInput 
        placeholder="Password" 
        value={password} 
        secureTextEntry 
        onChangeText={setPassword}  
        />
      <Spacer height={10}/>
      
      {error ? <ThemedText style={{ color: 'red' }}>{error}</ThemedText> : null}
      <Spacer height={10}/>

      <ThemedButton onPress = {handleLogin}><Text style={{color:'#ffffff',textAlign:'center'}}>Login</Text></ThemedButton>
      <Spacer height={50}/>

        <Spacer />
        {error && <Text style={styles.error}>{error}</Text>}

      <ThemedView style={styles.redirect}>
        <ThemedText style={{fontSize:20}}>Don't have an account? </ThemedText>
        <Link href="/register" style={[{color:Colors.primary},styles.link]}>Register</Link>
      </ThemedView>

        <Link href="/home" style={[{color:Colors.primary},styles.link]}>Home</Link>
    </ThemedView>

    </TouchableWithoutFeedback>
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
    alignItems:'stretch',
  },
  link:{
    fontSize:20,
  },
  error: {
    color: Colors.warning,
    padding: 10,
    backgroundColor: '#f5c1c8',
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  }

});
