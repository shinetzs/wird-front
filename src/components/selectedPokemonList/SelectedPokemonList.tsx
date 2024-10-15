import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "../pokemonCard/PokemonCard";
import "./SelectedPokemonList.css";
import { RootState } from "../../redux/store";
import { removePokemon } from "../../redux/slices/pokemonSlice";

const SelectedPokemonList: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPokemons = useSelector(
    (state: RootState) => state.pokemon.selectedPokemonList
  );

  const handleRemove = (id: number) => {
    dispatch(removePokemon(id));
  };

  return (
    <div className="selected-pokemon-list-container">
      <h1>Listos para el combate</h1>
      {selectedPokemons.length === 0 ? (
        <div className="empty-list-message">
          Lista vacía, no hay ningún Pokémon listo
        </div>
      ) : (
        <div className="card-container">
          {selectedPokemons.map((pokemon, index) => (
            <PokemonCard
              id={pokemon.id}
              key={index}
              label={pokemon.name}
              imageUrl={pokemon.imageUrl}
              isSelected={true}
              onClickIcon={() => handleRemove(pokemon.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedPokemonList;
