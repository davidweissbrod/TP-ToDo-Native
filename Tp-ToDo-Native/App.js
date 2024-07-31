import { StyleSheet, Text, SafeAreaView, TextInput, Modal, SafeAreaView } from 'react-native';
import { useState } from 'react';
import Listado from './components/Listado';
import { TouchableOpacity } from 'react-native-web';

export default function App() {
  const [show, setShow] = useState(false);
  const [nombreTarea, setNombreTarea] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tareas, setTareas] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const añadirTarea = (tarea) => {
    if (taskName && taskDescription) {
      setTareas([...tasks, { name: taskName, description: taskDescription }]);
      setNombreTarea('');
      setDescripcion('');
    }
  };
  const eliminarTarea = (index) => {
    setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
  };
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>To-Do List</Text>
        <div class = "agregar-tarea-modal">
          <TouchableOpacity style={styles.addButton} onPress={() => handleShow(true)}>
            <Text style={styles.addButtonText}>Añadir Tarea</Text>
          </TouchableOpacity>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Agregar Tarea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TextInput
                style={styles.input}
                onChangeText={setNombreTarea}
                value={nombreTarea}
                placeholder='Nombre de la tarea...'
              />
              <TextInput
                style={styles.input}
                onChangeText={setDescripcion}
                value={descripcion}
                placeholder='Descripcion...'
              />
            </Modal.Body>
            <Modal.Footer>
              <TouchableOpacity onPress={añadirTarea} style={styles.button}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cerrarBoton} onPress={() => handleClose(false)}>
                Cerrar
              </TouchableOpacity>
            </Modal.Footer>
          </Modal>
      </div>
      <div class = "lista-tareas">
        <ScrollView contentContainerStyle={styles.tasksContainer}>
          {tareas.length === 0 ? (
            <Text style={styles.vacio}>No hay tareas</Text>
          ) : (
            tareas.map((tarea, index) => (
              <View key={index} style={styles.tarea}>
                <Text style={styles.nombre}>{task.nombreTarea}</Text>
                <Text style={styles.descripcion}>{tarea.descripcion}</Text>
                <TouchableOpacity onPress={() => eliminarTarea(index)} style={styles.cerrarBoton}>
                  <Text style={styles.cerrarBoton}>Borrar</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      </div>
    </SafeAreaView>
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
  nombre: {
    fontFamily: 'Arial',
    fontSize: 50
  },
  descripcion: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: 'light-blue'
  },
  vacio:{
    fontFamily: 'Arial',
    fontSize: 80,
  },
  cerrarBoton: {
    backgroundColor: 'red',
    color: 'white'
  }
});
