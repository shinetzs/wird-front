import { useState } from "react";
import PokemonCard from "../pokemonCard/PokemonCard";
import "./PokemonList.css";
import { useDispatch, useSelector } from "react-redux";
import { addPokemon } from "../../redux/slices/pokemonSlice";
import { RootState } from "../../redux/store";
import { Pokemon } from "./../../interfaces";

const PokemonList: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const allPokemons = useSelector(
    (state: RootState) => state.pokemon.allPokemons
  );

  const filteredPokemons = allPokemons.filter((pokemon) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      pokemon.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      pokemon.id.toString().includes(lowerCaseSearchTerm)
    );
  });

  const handleSelect = (pokemon: Pokemon) => {
    dispatch(addPokemon(pokemon));
  };

  return (
    <div className="container">
      <input
        type="text"
        className="search-bar"
        placeholder="Que pokemon buscas ..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="card-container">
        {filteredPokemons.map((pokemon, index) => (
          <PokemonCard
            id={pokemon.id}
            key={index}
            label={pokemon.name}
            imageUrl={pokemon.imageUrl}
            isSelected={false}
            onClickIcon={() => handleSelect(pokemon)}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
