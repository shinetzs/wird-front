export interface Pokemon {
  name: string;
  id: number;
  imageUrl: string;
}

export interface PokemonListResponse {
  results: {
    name: string;
  }[];
}

export interface PokemonStats {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonDetails {
  sprites: {
    front_default: string;
  };
  name: string;
  id: number;
  height: number;
  types: PokemonType[];
  stats: PokemonStats[];
}
