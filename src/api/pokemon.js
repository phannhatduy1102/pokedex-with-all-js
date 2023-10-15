import { fetchData } from "../utils/index.js";

export function pokemonApi() {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon";
  return {
    getPokemon: async function (name) {
      if (!name) return;

      try {
        const response = await fetchData({
          url: `${baseUrl}/${name.toLowerCase()}`,
        });

        if (!response) return;

        return {
          id: response.id,
          name: response.name,
          image: response.sprites?.other?.["official-artwork"]?.front_default,
          types: response.types.map((item) => item.type.name),
          order: response.id,
        };
      } catch (error) {
        console.error(error);
      }
    },
    getPokemonList: async function (limit = 12, offset = 0) {
      try {
        const response = await fetchData({
          url: `${baseUrl}?limit=${limit}&offset=${offset}`,
        });
        const pokemonNameList = response.results.map((item) => item.name);
        const pokemonNameListPromise = pokemonNameList.map((pokemon) =>
          this.getPokemon(pokemon)
        );
        return await Promise.all(pokemonNameListPromise);
      } catch (error) {
        console.error(error);
      }
    },
  };
}
