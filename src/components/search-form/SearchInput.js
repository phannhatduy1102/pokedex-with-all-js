import { pokemonApi } from "../../api/pokemon.js";
import { withComponent } from "../../utils/index.js";
import { ATOM_KEYS } from "../../constants/index.js";
import { useAtom } from "../../lib/index.js";

function SearchInput() {
  const jsonDom = {
    type: "div",
    className: "flex pt-3 gap-x-6",
    children: [
      {
        type: "input",
        name: "search",
        className: "h-[48px] w-full border-rounded rounded text-[#000] pl-4",
        events: [
          {
            type: "keydown",
            key: 0,
          },
          {
            type: "change",
            key: 0,
          },
        ],
      },
      {
        type: "button",
        className:
          "search-button bg-[#ee6b2f] h-[48px] w-[72px] border-rounded rounded",
        events: [
          {
            type: "click",
            key: 1,
          },
        ],
        children: [
          {
            type: "div",
            className: "fa fa-search",
          },
        ],
      },
    ],
  };

  return {
    jsonDom,
  };
}

export const SearchInputElement = () => {
  const [_, setPokemonList] = useAtom(ATOM_KEYS.POKEMON_LIST, []);
  const [searchValue, setSearchValue] = useAtom(
    ATOM_KEYS.POKEMON_SEARCH_VALUE,
    ""
  );

  const [__, setPokemonListPagination] = useAtom(
    ATOM_KEYS.POKEMON_LIST_PAGINATION,
    {
      limit: 15,
      offset: 0,
    }
  );

  const handleClickSearch = (event) => {
    if (searchValue() === "") {
      setPokemonListPagination({
        limit: 15,
        offset: 0,
      });
      return;
    }
    pokemonApi()
      .getPokemon(searchValue())
      .then((res) => {
        if (res) {
          setPokemonList([res]);
        }
      });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  return new withComponent(SearchInput, {}, [
    handleInputChange,
    handleClickSearch,
  ]).createJsonDom();
};
