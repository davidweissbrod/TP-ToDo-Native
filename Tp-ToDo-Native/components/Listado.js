import React from 'react';
import Card from './Card'

const Listado = ({ tareas, eliminarTarea }) => {
  return (
    <div>
      {tareas.map((tarea, index) => (
        <Card key={index} tarea={tarea} onDelete={() => eliminarTarea(index)}/>
      ))}
    </div>
  );
};

export default Listado;