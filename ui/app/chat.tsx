import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { MMKV } from 'react-native-mmkv';

import axios from 'axios';

import Colors from '@/constants/Colors';


const storage = new MMKV();

const Chat = () => {
  const params = useLocalSearchParams();
  const email = params.email;
  const passData : string = params.passData as string;
  const insets = useSafeAreaInsets();

  const d = JSON.parse(passData);

  const [data, setData] = useState<any>(d);
  const [textInput, setTextInput] = useState('');


  const apiUrl = 'http://localhost:8000/api/v1/chat';

  
  const saveChat = async () => {
    if (data[0] === undefined) {
      alert('Nothing to save here');
      return;
    }

    if (!email || typeof email !== 'string') {
      alert('Invalid email address.');
      return;
    }

    const storeData = {
      title: data[0].text,
      chats: data,
    };

    try {
      const existingData = storage.getString(email);
      let chatArray = [];
      if (existingData) {
        chatArray = JSON.parse(existingData);
      }
      chatArray.push(storeData);
      storage.set(email, JSON.stringify(chatArray));
      console.log('Chat saved successfully!');
    } catch (error) {
      console.error('Error saving chat:', error);
      alert('Error saving chat');
    }

  }


  const showHistory = () => {
    router.replace({
      pathname: '/history',
      params: { email: email }
    })
  }

  const onSend = async () => {

    const prompt = textInput;

    const response = await axios.post(apiUrl, {
      prompt: prompt
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const text = response.data.bot

    // Simulating sending message and receiving response
    // const text = "this is a testing message";

    setData([...data, { type: 'user', text: textInput }, { type: 'bot', text }]);
    setTextInput('');
  };


  return (
    <View style={{ flex: 1, paddingTop: insets.top, maxWidth: '100%' }}>
      <Text>Welcome {email}</Text>
      <Text style={styles.title}>SupportU Bot</Text>

      <Button
        title="Save Chat"
        onPress={saveChat}
      />

      <Button
        title="Show History"
        onPress={showHistory}
      />
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            style={styles.body}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', padding: 10 }}>
                <Text style={{ fontWeight: 'bold', color: item.type === 'user' ? 'green' : 'red' }}>
                  {item.type === 'user' ? 'User: ' : 'Bot: '}
                </Text>
                <Text style={styles.bot}>{item.text}</Text>
              </View>
            )}
          />
        </View>

        <BlurView intensity={90} tint="extraLight" style={styles.blurView}>
          <View style={styles.row}>
            <TextInput
              autoFocus
              placeholder="Message"
              style={styles.messageInput}
              multiline
              value={textInput}
              onChangeText={setTextInput}
            />
            <TouchableOpacity onPress={onSend}>
              <Ionicons name="arrow-up-circle" size={24} color={Colors.grey} />
            </TouchableOpacity>
          </View>
        </BlurView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 5,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    padding: 10,
    borderColor: Colors.greyLight,
    backgroundColor: Colors.light,
  },
  body: {
    flex: 1,
  },
  bot: {
    fontSize: 16,
  },
  blurView: {
    padding: 10,
    marginBottom: 50,
  },
});

export default Chat;
