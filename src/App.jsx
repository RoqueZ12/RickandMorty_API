import { useState, useEffect } from 'react';
import { Card } from './componentes/Card';
import { Boton } from './componentes/Boton';
import './estilos/App.scss';

function App() {
  const [personajeId, setPersonajeId] = useState(1);
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mostrarDosBotones, setMostrarDosBotones] = useState(false);
  const personajesPorPagina = 12;

  useEffect(() => {
    setLoading(true);
    setError('');

    getCharacter(personajeId)
      .then((newCharacters) => {
        setCharacter(newCharacters);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError('Error al cargar datos');
        console.error(err);
      });
  }, [personajeId]);

  async function getCharacter(id) {
    try {
      const newCharacter = [];

      for (let i = 0; i < personajesPorPagina; i++) {
        const nextCharacterId = id + i;
        const response = await fetch(`https://rickandmortyapi.com/api/character/${nextCharacterId}`);
        const data = await response.json();

        if (data.name && data.name.length > 0) {
          const personajeImg = await getPersonajeImg(data.name);
          newCharacter.push({ id: data.id, name: data.name, img: personajeImg, location:data.location.name, species:data.species});
        }
        
      }

      return newCharacter;
    } catch (error) {
      console.error('Error al obtener los personajes:', error);
      return [];
    }
  }

  async function getPersonajeImg(name) {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
      const data = await response.json();

      if (data.results.length > 0) {
        return data.results[0].image;
      }
    } catch (error) {
      console.error('Error al obtener la imagen del personaje:', error);
      return '';
    }
  }

  const siguiente = () => {
    setPersonajeId((prevId) => prevId + personajesPorPagina);
    setMostrarDosBotones(true); // Al hacer clic en siguiente, mostrar ambos botones
  };

  const anterior = () => {
    setPersonajeId((prevId) => Math.max(prevId - personajesPorPagina, 1));
    setMostrarDosBotones(true); // Al hacer clic en anterior, mostrar ambos botones
  };
  const handleButton = () => {
    // Cambia el estado para mostrar dos botones
    setMostrarDosBotones(true);
    setPersonajeId((prevId) => prevId + personajesPorPagina);
  };

  const esPrimeraPagina = personajeId === 1;

  return (
    <div className='app'>
      {loading && <p className='loading'></p>}
      {error && <p className='error-message'>{error}</p>}
      <header className='cabecera'>
        <h1>RICK AND MORTY APP</h1>
      </header>
      <div className='contenedor-principal'>
        {character.map((personaje) => (
          <Card 
          key={personaje.id} 
          name={personaje.name} 
          img={personaje.img} 
          location={personaje.location} 
          species={personaje.species} />
        ))}
      </div>
      <div className='container-button'>
        {mostrarDosBotones ? (
          <div className={`container-button ${mostrarDosBotones ? 'container-button-dos' : ''}`}>
            {!esPrimeraPagina && <Boton name='Anterior' handleClick={anterior} />}
            
          <Boton name='Siguiente' handleClick={siguiente} />  
          </div>
        ) : (<Boton name='Siguiente' handleClick={handleButton} /> )}
        
      </div>
    </div>
  );
}

export default App;