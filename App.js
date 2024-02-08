import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button,TextInput, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  var myString = "" // duer ikke til at gemme på tværs af renderings
  const [text, setText] = useState("")
  const [list, setList] = useState([]) 
  
  async function saveList(){
    try {
      const jsonValue = JSON.stringify(list)
      await AsyncStorage.setItem('@myList', jsonValue)
    } catch (error) { }
  }

  async function loadList(){
    try {
      const jsonValue = await AsyncStorage.getItem('@myList')
      if(jsonValue != null){
        const arr = JSON.parse(jsonValue)
        if(arr != null){
          setList(arr)
        }
      }
    } catch (error) { }
  }



  function pressMe(){
    setList([...list,{key:list.length, value:text}])
  }

  return (
    <View style={styles.container}>
      <Text>Notebook</Text>
      <TextInput style={styles.textInput} onChangeText={setText}/>
      <Button title="Press Me" onPress={pressMe} />
      <Button title="Save List" onPress={saveList} />
      <Button title="Load List" onPress={loadList} />
      <FlatList 
        data={list}
        renderItem={(note) => <Text>{note.item.value}</Text>}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput:{
    backgroundColor:'#ccc'
  }
});
