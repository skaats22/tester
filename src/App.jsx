import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=10"
        );
        // fetch always returns something so response.ok means it returned
        //  status code 200 - 299
        if (!response.ok) {
          throw new Error("Error");
        }
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchPokemonList();
  }, []);

  async function handleSelect(e) {
    const url = e.target.value;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch details.");
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!pokemonList) {
    return <p>Loading...</p>;
  }

  function capital(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <h1>Select a pokemon!</h1>
      <select onChange={handleSelect} defaultValue="">
        <option value="" disabled>
          Choose a pokemon
        </option>
        {pokemonList.map((poke) => (
          <option key={poke.name} value={poke.url}>
            {capital(poke.name)}
          </option>
        ))}
      </select>

      {selectedPokemon && (
        <div>
          <h2>{capital(selectedPokemon.name)}</h2>
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />
          <img
            src={selectedPokemon.sprites.front_shiny}
            alt={selectedPokemon.name}
          />
        </div>
      )}
    </>
  );
}

export default App;
