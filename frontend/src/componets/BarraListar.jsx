import React, { useEffect, useState } from 'react';
import { Table, Card, Form, Button } from 'react-bootstrap';
import Delete from '../assets/borrar1.png';
import Update from '../assets/actualizar.png';

//import Delete  from '../assets/remover.png';

import axios from 'axios';
import Mensaje from './Alertas/Mensaje';

const BarraListar = () => {
  const [conductores, setConductores] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState(null);

  // Función para listar conductores desde el backend
  const listarConductores = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_URL_BACKEND}/listar/conductores`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const respuesta = await axios.get(url, options);

      // Validamos que la respuesta contiene la propiedad "conductores" y es un arreglo
      if (respuesta.data && Array.isArray(respuesta.data.conductores)) {
        setConductores(respuesta.data.conductores);
      } else {
        throw new Error('La respuesta del servidor no contiene un arreglo de conductores');
      }
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al cargar los conductores. Intente nuevamente.');
    }
  };

  // Filtrar los conductores según la búsqueda
  const conductoresFiltrados = conductores.filter((conductor) =>
    `${conductor.nombre} ${conductor.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Efecto para cargar los conductores al montar el componente
  useEffect(() => {
    listarConductores();
  }, []);

  return (
    <>
      {/* Barra de búsqueda */}
      <Form className="d-flex mb-3">
        <Form.Control
          type="search"
          placeholder="Buscar Conductor"
          className="me-2"
          aria-label="Search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <Button variant="outline-success">BUSCAR</Button>
      </Form>

      {/* Mostrar mensaje de error si ocurre */}
      {error && <Mensaje tipo="danger">{error}</Mensaje>}

      {/* Mostrar mensaje si no hay conductores */}
      {conductores.length === 0 && !error && <Mensaje tipo="info">{'No existen registros'}</Mensaje>}

      {/* Tabla de conductores */}
      {conductores.length > 0 && (
        <Card className="shadow-lg rounded-lg border-0 mt-3">
          <Card.Body>
            <Table striped bordered hover responsive className="table-sm text-center w-100">
              <thead>
                <tr style={{ backgroundColor: '#1f2833', color: '#ffffff' }}>
                  <th>N°</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Cédula</th>
                  <th>Ruta</th>
                  <th>Sector</th>
                  <th>Placa Vehicular</th>
                  
                  <th>Correo</th>
                 
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {conductoresFiltrados.map((conductor, index) => (
                  <tr style={{ backgroundColor: '#f8f9fa' }} key={conductor._id}>
                    <td>{index + 1}</td>
                    <td>{conductor.nombre}</td>
                    <td>{conductor.apellido}</td>
                    <td>{conductor.cedula}</td>
                    <td>{conductor.rutaAsignada}</td>
                    <td>{conductor.sectoresRuta}</td>
                    <td>{conductor.placaAutomovil}</td>
                    
                    <td>{conductor.email}</td>
                   
                    <td className="d-flex justify-content-center align-items-center" style={{ minWidth: '150px' }}>
                      <img
                        src={Update}
                        alt="Update"
                        style={{ height: '35px', width: '35px', marginRight: '7px' }}
                        className="cursor-pointer inline-block"
                        onClick={() => console.log('Actualizar:', conductor._id)}
                      />
                      
                      <img
                        src={Delete}
                        alt="Delete"
                        style={{ height: '35px', width: '35px', marginRight: '7px' }}
                        className="cursor-pointer inline-block"
                        onClick={() => console.log('Eliminar:', conductor._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default BarraListar;
