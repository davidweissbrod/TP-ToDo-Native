import { StyleSheet, Text, SafeAreaView, TextInput, Modal, SafeAreaView } from 'react-native';
import { useState } from 'react';
import Listado from './components/Listado';

export default function App() {
  const [show, setShow] = useState(false);
  const [text, onChangeText] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const nuevaTarea = (nombre, descripcion)

  const añadirTarea = (tarea) => {
    setTareas([...tarea, tareas]);
  };
  const eliminarTarea = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas.splice(index, 1);
    setTareas(nuevasTareas);
  };
  return (
    <SafeAreaView style={styles.container}>
        <Text>To-Do List</Text>
        <div class = "agregar-tarea-modal">
          <Button variant="primary" onClick={handleShow}>
              Agregar Tarea
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Agregar Tarea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={nuevaTarea.nombre}
                placeholder='Nombre de la tarea...'
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={nuevaTarea.descripcion}
                placeholder='Descripcion...'
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={añadirTarea(nuevaTarea)}>
                Guardar
              </Button>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
      </div>
      <div class = "lista-tareas">
          <Listado tareas={tareas} eliminarTarea={eliminarTarea}></Listado>
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
});
