import { API_ENDPOINTS } from "@/constants/apiConstants";
import api from "@/config/axiosConfig";
export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: Pokemon[];
  next: string | null;
}

export const fetchPokemonList = async (): Promise<PokemonListResponse> => {
  try {
    const response = await api.get<PokemonListResponse>(
      API_ENDPOINTS.POKEMON_LIST
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon list", error);
    throw error;
  }
};

interface PokemonDetail {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: { front_default: string };
}

export const fetchPokemonDetail = async (
  name: string
): Promise<PokemonDetail> => {
  try {
    const response = await api.get(API_ENDPOINTS.POKEMON_DETAILS(name));
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for Pokemon: ${name}`, error);
    throw error;
  }
};

export const fetchPokemonTypes = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.POKEMON_TYPES);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon types", error);
  }
};

export const fetchPokemonByType = async (
  p_type: string
): Promise<Pokemon[]> => {
  try {
    const response = await api.get(API_ENDPOINTS.POKEMON_LIST_BY_TYPE(p_type));
    return response.data.pokemon.map((p) => p.pokemon);
  } catch (error) {
    console.error("Error fetching Pokemon by p_type", error);
    return [];
  }
};
