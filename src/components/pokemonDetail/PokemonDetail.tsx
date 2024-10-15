import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  addPokemon,
  removePokemon,
  setSelectedPokemon,
} from "../../redux/slices/pokemonSlice";
import { useFetch } from "../../hooks/useFetch";
import "./PokemonDetail.css";
import leftArrowIcon from "./../../assets/leftArrow.png";
import { PokemonDetails } from "./../../interfaces";

const PokemonDetail: React.FC = () => {
  const dispatch = useDispatch();

  const selectedPokemonId = useSelector(
    (state: RootState) => state.pokemon.selectedPokemonId
  );

  const { data: pokemon, loading } = useFetch<PokemonDetails>(
    "https://pokeapi.co/api/v2/pokemon/" + selectedPokemonId
  );

  const selectedPokemonList = useSelector(
    (state: RootState) => state.pokemon.selectedPokemonList
  );

  const isSelected = selectedPokemonList.some(
    ({ id }) => id === selectedPokemonId
  );

  const handleBack = () => {
    dispatch(setSelectedPokemon(null));
  };

  const handleAddRemove = () => {
    if (pokemon) {
      if (isSelected) {
        dispatch(removePokemon(pokemon.id));
      } else {
        dispatch(
          addPokemon({
            id: pokemon.id,
            name: pokemon.name,
            imageUrl: pokemon.sprites.front_default,
          })
        );
      }
    }
  };

  if (loading) {
    return <h1>Loading ....</h1>;
  }

  if (!pokemon) {
    return <div>Error: Pokémon no encontrado.</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <label className="return" onClick={handleBack}>
          <img src={leftArrowIcon} className="arrow-icon" alt="Volver" />
          Volver
        </label>
        <img
          className="pokemon-img"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <button className="add-remove-button" onClick={handleAddRemove}>
          {isSelected ? "Eliminar de la lista" : "Agregar a la lista"}
        </button>
      </div>
      <div className="details">
        <div className="info">
          <h2>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
          <p>Número: {pokemon.id}</p>
          <p>Altura: {pokemon.height / 10} m</p>
          <p>Tipo: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
        </div>
        <h3>Estadísticas base:</h3>
        <ul>
          <li>Ataque: {pokemon.stats[1].base_stat}</li>
          <li>Defensa: {pokemon.stats[2].base_stat}</li>
          <li>Ataque especial: {pokemon.stats[3].base_stat}</li>
          <li>Defensa especial: {pokemon.stats[4].base_stat}</li>
          <li>Velocidad: {pokemon.stats[5].base_stat}</li>
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;
