import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, Alert, CheckBox } from 'react-native';

const App = () => {
  const [tareas, setTareas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');

  const guardarTareasEnAsyncStorage = async (tareas) => {
    try {
      await AsyncStorage.setItem('tareas', JSON.stringify(tareas));
    } catch (error) {
      console.error('Error guardando las tareas en AsyncStorage', error);
    }
  };
  
  const recuperarTareasDeAsyncStorage = async () => {
    try {
      const tareasGuardadas = await AsyncStorage.getItem('tareas');
      return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
    } catch (error) {
      console.error('Error recuperando las tareas de AsyncStorage', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchTareas = async () => {
      const tareasRecuperadas = await recuperarTareasDeAsyncStorage();
      setTareas(tareasRecuperadas);
    };
    fetchTareas();
  }, []);

  const marcarCompletado = (id) => {
    setTareas((prevTareas) =>
      prevTareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completado: !tarea.completado } : tarea
      )
    );
  };

  const agregarTarea = () => {
    if (nuevoNombre && nuevaDescripcion) {
      setTareas([
        ...tareas,
        {
          id: (tareas.length + 1).toString(),
          nombreTarea: nuevoNombre,
          descripcion: nuevaDescripcion,
          completado: false,
        },
      ]);
      setNuevoNombre('');
      setNuevaDescripcion('');
      setModalVisible(false);
      guardarTareasEnAsyncStorage(tareas)
    } else {
      Alert.alert('Error', 'Por favor ingrese el nombre y la descripción de la tarea.');
    }
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id));
  };


  const renderTarea = ({ item }) => (
    <View style={styles.tareaContainer}>
      <View style={styles.tareaContent}>
        <CheckBox
          value={item.completado}
          onValueChange={() => marcarCompletado(item.id)}
        />
        <View style={styles.textContainer}>
          <Text style={item.completado ? styles.textoCompletado : styles.textoPendiente}>
            {item.nombreTarea}
          </Text>
          <Text style={item.completado ? styles.descripcionCompletada : styles.descripcion}>
            {item.descripcion}
          </Text>
        </View>
        <TouchableOpacity onPress={() => eliminarTarea(item.id)}>
          <Text style={styles.botonEliminar}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tareas}
        renderItem={renderTarea}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.botonAgregar} onPress={() => setModalVisible(true)}>
        <Text style={styles.botonTexto}>Agregar Tarea</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la tarea"
              value={nuevoNombre}
              onChangeText={setNuevoNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={nuevaDescripcion}
              onChangeText={setNuevaDescripcion}
            />
            <TouchableOpacity style={styles.botonAgregar} onPress={agregarTarea}>
              <Text style={styles.botonTexto}>Agregar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonCancelar} onPress={() => setModalVisible(false)}>
              <Text style={styles.botonTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tareaContainer: {
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    elevation: 1,
  },
  tareaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  textoPendiente: {
    fontSize: 18,
    color: 'black',
  },
  textoCompletado: {
    fontSize: 18,
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  descripcion: {
    fontSize: 14,
    color: 'darkgray',
  },
  descripcionCompletada: {
    fontSize: 14,
    color: 'lightgray',
    textDecorationLine: 'line-through',
  },
  botonAgregar: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  botonTexto: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  botonCancelar: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  botonEliminar: {
    color: 'red',
    fontSize: 16,
  },
});

export default App;
