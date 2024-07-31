import React from 'react';
import { Button } from 'react-bootstrap';

const Boton = ({ color, onClick, children, type = "button"}) => (
  <Button variant={color} onClick={onClick} type = {type}>
    {children}
  </Button>
);

export default Boton;