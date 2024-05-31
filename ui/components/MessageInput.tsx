import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {BlurView} from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';


import Colors from '@/constants/Colors';

const MessageInput = () => {
    const [message, setMessage] = useState('');
    const { bottom } = useSafeAreaInsets();

    const sendMessage = (input: any) => {
        console.log(input)
    }
    
    const onSend = () => {
        alert(message)
        sendMessage(message);
        setMessage('');
    };

  return (
    <BlurView intensity={90} tint="extraLight" style={{paddingBottom: bottom, paddingTop: 0}}>
      <View style={styles.row}>

        <TextInput 
            autoFocus
            placeholder = 'Message'
            style = {styles.messageInput}
            multiline
            value={message}
            onChangeText={setMessage}
        />

        <TouchableOpacity onPress={onSend}>
            <Ionicons name="arrow-up-circle" size={24} color={Colors.grey} />
        </TouchableOpacity>


      </View>
    </BlurView>
  )
}


const styles = StyleSheet.create({
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
    roundBtn: {
      width: 30,
      height: 30,
      borderRadius: 20,
      backgroundColor: Colors.input,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
});

export default MessageInput