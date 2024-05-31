import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';

const Login = ({ }) => {
  const [email_input, setemail_input] = useState('');
  const [password_input, setpassword_input] = useState('');

  const handlelogin = async () => {
    const data = {
        email: email_input,
        password: password_input
    }
    try {
        const response = await axios.post('http://localhost:8000/api/v1/login', data, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        // const response = {
        //     status: 200,
        //     data: {
        //         message: "test"
        //     }
        // }

      if (response.status === 200) {
        // Alert.alert('Success', response.data.message);
        router.replace({
          pathname: '/chat',
          params: { email: email_input, passData: JSON.stringify([]) }
        });
      } else if (response.status === 401) {
        Alert.alert('Wrong pwd');
      } 
      else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('login error:', error);
      Alert.alert('Error', 'Something went wrong!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>login</Text>
      <TextInput
        style={styles.input}
        placeholder="email_input"
        value={email_input}
        onChangeText={setemail_input}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="password_input"
        value={password_input}
        onChangeText={setpassword_input}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="login" onPress={handlelogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default Login;