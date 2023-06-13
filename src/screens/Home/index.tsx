import { Text, View, StyleSheet, TextInput, Keyboard, TouchableOpacity, FlatList, Alert, } from 'react-native'

import { styles } from './styles';

import {Participant} from '../../components/Participant';

import React,{ useState } from 'react'

export  function Home(){
  const [participants, setParticipants] =  useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd(){
    if(participants.includes(participantName)){
      return Alert.alert('Participante já existente','Já existe um participante com esse nome')
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');

  }

  function handleParticipantRemove(name: string){
    Alert.alert('Remover', `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () =>setParticipants(prevState => prevState.filter(participant => participant !== name))

      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])

    console.log(`Você cliclou no botão de remover ${name}`);
  }


  return(
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do personagem foda
      </Text>

      <Text style={styles.eventDate}>
        Terça. 6 de junho de 2023. 
      </Text>

   
  <View style={styles.form}>
  <TextInput 
      style={styles.input} 
      placeholder='Nome do participante'
      placeholderTextColor='#6B6B6B'
      // keyboardType='email-address'
      onChangeText={setParticipantName}
      value={participantName}
      />

    <TouchableOpacity 
      style={styles.button}
      onPress={handleParticipantAdd}> 
    
        <Text style={styles.buttonText}>
          +
        </Text>
    </TouchableOpacity>
  </View>

    <FlatList 
      data={participants}
      keyExtractor={item => item}
      renderItem={({ item })=> ( 
        <Participant 
          key={item}
          name={item}
          onRemove={() => handleParticipantRemove(item)}
        />
        )}
    showsVerticalScrollIndicator={false}
    ListEmptyComponent={()=>(
      <Text style={styles.listEmptyText}>
        Ninguém chegou no evento ainda? Adcione participantes a sua lista de presença.
      </Text>
    )}
    />

   
</View>
  );
}