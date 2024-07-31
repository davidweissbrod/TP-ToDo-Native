import { StyleSheet, Text, View, TextInput, Modal } from 'react-native'
import Boton from './Boton';

export default function Header() {
    return (
      <View style={styles.container}>
        <Header>
          <Text>To-Do List</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </Header>
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
    input: {
      width: 75,
      padding: 10,
      float: left,
      fontSize: 30
    },
  });