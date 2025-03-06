export const API_ENDPOINTS = {
  POKEMON_TYPES: "/type",
  POKEMON_LIST_BY_TYPE: (name: string) => `/type/${name}`,
  POKEMON_LIST: "/pokemon?limit=20",
  POKEMON_DETAILS: (name: string) => `/pokemon/${name}`,
};
