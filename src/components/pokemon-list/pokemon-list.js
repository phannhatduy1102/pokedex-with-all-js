import { ATOM_KEYS } from "../../constants/index.js";
import { useAtom } from "../../lib/index.js";
import { appendManyChild, withComponent } from "../../utils/index.js";
import { PokemonItemElement } from "./pokemon-item.js";
import { pokemonApi } from "../../api/pokemon.js";

function PokemonList(props = {}) {
  const { pokemonList } = props;
  const pokemonItemElements = pokemonList().map((pokemon) => {
    return PokemonItemElement({
      pokemon,
    });
  });

  const jsonDom = {
    type: "div",
    className: "pokemon-list pt-8 min-h-[80vh]",
    children: [
      {
        type: "div",
        className: "pokemon-list-wrapper",
        children: [
          {
            type: "ul",
            className: "grid grid-cols-5 gap-4",
            id: "pokemon-list",
            children: pokemonItemElements.map((pokemon) => ({
              type: "element",
              element: pokemon,
            })),
          },
        ],
      },
    ],
  };

  return {
    jsonDom,
  };
}

export const PokemonListElement = () => {
  const [pokemonList, setPokemonList, subscribePokemonList] = useAtom(
    ATOM_KEYS.POKEMON_LIST,
    []
  );

  const [pokemonListPagination, setPokemonListPagination, subscribePagination] =
    useAtom(ATOM_KEYS.POKEMON_LIST_PAGINATION, {
      limit: 15,
      offset: 0,
    });

  (() => {
    const getPokemonListResponse = pokemonApi().getPokemonList();
    getPokemonListResponse.then((res) => {
      setPokemonList(res);
    });

    subscribePokemonList(() => {
      renderPokemon();
    });

    subscribePagination(() => {
      const { limit, offset } = pokemonListPagination();
      const getPokemonListResponse = pokemonApi().getPokemonList(limit, offset);
      getPokemonListResponse.then((res) => {
        setPokemonList(res);
      });
    });
  })();

  const renderPokemon = () => {
    const createPokemonElements = pokemonList().map((pokemon) => {
      return PokemonItemElement({
        pokemon,
      });
    });
    const pokemonListElement = document.getElementById("pokemon-list");
    pokemonListElement.innerHTML = "";
    appendManyChild(pokemonListElement, createPokemonElements);
  };

  return new withComponent(PokemonList, {
    pokemonList,
  }).createJsonDom();
};
