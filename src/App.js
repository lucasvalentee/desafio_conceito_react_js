import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);  

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  }, []);  

  async function handleAddRepository() {
    const oResponse = await api.post('repositories', {
      id   : '123',
      url  : 'www.teste.com.br',
      title: `Novo repositório do Desafio - ${Date.now()}`,
      techs: ["JS", "Node"]
    });

    setRepositories([...repositories, oResponse.data]);
  }

  async function handleRemoveRepository(id) {
    const oResponse = await api.delete(`repositories/${id}`);

    if(oResponse.status === 204) {
      repositories.splice(repositories.findIndex(repository => repository.id === id), 1);
      setRepositories([...repositories]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id} >{repository.title}
                                   <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
                                 </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
