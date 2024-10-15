import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Pokemon {
  name: string;
  id: number;
  imageUrl: string;
}

interface PokemonState {
  allPokemons: Pokemon[];
  selectedPokemonList: Pokemon[];
  selectedPokemonId: number | null;
}

const initialState: PokemonState = {
  allPokemons: [],
  selectedPokemonList: [],
  selectedPokemonId: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<Pokemon>) => {
      if (
        state.selectedPokemonList.length < 6 &&
        !state.selectedPokemonList.find(
          (pokemon) => pokemon.name === action.payload.name
        )
      ) {
        state.selectedPokemonList.push(action.payload);
      }
    },
    removePokemon: (state, action: PayloadAction<number>) => {
      state.selectedPokemonList = state.selectedPokemonList.filter(
        (pokemon) => pokemon.id !== action.payload
      );
    },
    setAllPokemon: (state, action: PayloadAction<Pokemon[]>) => {
      state.allPokemons = action.payload;
    },
    setSelectedPokemon: (state, action: PayloadAction<number | null>) => {
      state.selectedPokemonId = action.payload;
    },
    clearSelectedPokemon: (state) => {
      state.selectedPokemonId = null;
    },
  },
});

export const {
  setAllPokemon,
  addPokemon,
  removePokemon,
  setSelectedPokemon,
  clearSelectedPokemon,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
