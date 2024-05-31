import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MMKV } from 'react-native-mmkv';
import { RouteProp } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';

interface ChatData {
  title: string;
  chats: any;
}

const storage = new MMKV();

const History = () => {
  const { email } = useLocalSearchParams();
  const [chatHistory, setChatHistory] = useState<ChatData[]>([]);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = () => {
    try {
      if (!email || typeof email !== 'string') {
        alert('Invalid email address.');
        router.replace('/chat');
        return;
      }

      const existingData = storage.getString(email);
      if (existingData) {
        const history: ChatData[] = JSON.parse(existingData);
        setChatHistory(history);
      }


    } catch (error) {
      console.error('Error fetching chat history:', error);
      Alert.alert('Error fetching chat history');
    }
  };

  const handleChatPress = (chat: ChatData) => {
    router.replace({
      pathname: '/chat',
      params: {
        email: email, passData: JSON.stringify(chat.chats)
      }
    })
  };

  return (
    <View style={{ flex: 1 }}>

        <FlatList
          data={chatHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleChatPress(item)}>
              <View style={styles.chatItem}>
                <Text style={styles.chatTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

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
  chatItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chatTitle: {
    fontSize: 18,
  },
  selectedChatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedChatTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chatMessage: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default History;
