import React ,{useState} from 'react';
import { Button, Dimensions, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import {  useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CreateTask() {
  const [note,setNote] = useState('')
  const navigation = useNavigation()

  const saveNote = async ()=>{
      const value = await AsyncStorage.getItem("NOTES")
      const n = value ? JSON.parse(value):[]
      n.push(note)
      await AsyncStorage.setItem("NOTES",JSON.stringify(n)).then(()=>{
          navigation.navigate("AllTasks")
          setNote('')
      })
  }

  return (
  <View style={styles.container}>
      <TextInput 
      value = {note}
      onChangeText = {setNote}
      style={{color:'grey', fontSize:22}}
      multiline={true}
      autoFocus
      selectionColor='#fff'
      />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.bottom}>
     
        <Button
             style={styles.button} 
            appereance='filled'
            onPress={saveNote}
            title="Create Task"
            >
           Create task
        </Button>
      </KeyboardAvoidingView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    color: 'white',
    padding:30,
    paddingTop:80,
    width : Dimensions.get('window').width,
  },
  bottom: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 36
  },
  button:{
      marginBottom:30
  }
});
