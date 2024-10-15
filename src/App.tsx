import PokemonList from "./components/pokemonList/PokemonList";
import { useFetch } from "./hooks/useFetch";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAllPokemon } from "./redux/slices/pokemonSlice";
import PokemonDetail from "./components/pokemonDetail/PokemonDetail";
import { RootState } from "./redux/store";
import SelectedPokemonList from "./components/selectedPokemonList/SelectedPokemonList";
import { PokemonListResponse, Pokemon } from "./interfaces";

const POKE_API_BASE_URL = `https://pokeapi.co/api/v2/pokemon`;

function App() {
  const dispatch = useDispatch();
  const { data: pokemonList, loading } = useFetch<PokemonListResponse>(
    `${POKE_API_BASE_URL}?limit=151`
  );

  useEffect(() => {
    const fetchPokemonsWithImages = async () => {
      if (pokemonList && Array.isArray(pokemonList.results)) {
        const pokemonsWithImages: Pokemon[] = await Promise.all(
          pokemonList.results.map(async (pokemon, index) => {
            const response = await fetch(`${POKE_API_BASE_URL}/${index + 1}`);
            const pokemonDetails = await response.json();
            return {
              name: pokemon.name,
              id: pokemonDetails.id,
              imageUrl: pokemonDetails.sprites.front_default,
            };
          })
        );

        dispatch(setAllPokemon(pokemonsWithImages));
      }
    };

    fetchPokemonsWithImages();
  }, [pokemonList, dispatch]);

  const selectedPokemonId = useSelector(
    (state: RootState) => state.pokemon.selectedPokemonId
  );

  if (loading) {
    return <h1>Loading ....</h1>;
  }

  return (
    <div className="grid-container">
      {selectedPokemonId ? <PokemonDetail /> : <PokemonList />}
      <SelectedPokemonList />
    </div>
  );
}

export default App;
