import { pokemonApi } from "../../api/index.js";
import { ATOM_KEYS } from "../../constants/index.js";
import { useAtom } from "../../lib/index.js";
import { randomNumber, withComponent } from "../../utils/index.js";

function PokemonFilter() {
  const jsonDom = {
    type: "div",
    className: "flex justify-between pt-8",
    children: [
      {
        type: "button",
        id: "surprise-button",
        className:
          "surprise-button flex w-[35%] py-3 px-5 items-center gap-x-2 text-[#fff] bg-[#30a7d7] justify-center rounded-md",
        children: [
          {
            type: "div",
            className: "surprise-button-icon fa fa-refresh",
          },
          {
            type: "span",
            text: "Surprise Me!",
          },
        ],
        events: [
          {
            type: "click",
            key: 0,
          },
        ],
      },
      {
        type: "div",
        className: "pokemon-sort basis-[45%] max-w-[45%]",
        children: [
          {
            type: "div",
            className: "flex gap-x-4 items-center",
            children: [
              {
                type: "p",
                className: "text-[#a4a4a4] text-[20px] whitespace-nowrap",
                text: "Sort By",
              },
              {
                type: "div",
                className: "sort-select text-[#fff] w-full",
                children: [
                  {
                    type: "select",
                    name: "sort",
                    id: "sort",
                    className:
                      "bg-[#313131] border-rounded rounded-md px-4 py-2 appearance-none w-full",
                    events: [
                      {
                        type: "change",
                        key: 1,
                      },
                    ],
                    children: [
                      {
                        type: "option",
                        value: "1",
                        text: "Lowest Number (First)",
                        className: "sort-select-option",
                      },
                      {
                        type: "option",
                        value: "2",
                        text: "Highest Number (First)",
                        className: "sort-select-option",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  return {
    jsonDom,
  };
}

export const PokemonFilterElement = () => {
  const [pokemonListPagination, setPokemonListPagination, subscribe] = useAtom(
    ATOM_KEYS.POKEMON_LIST_PAGINATION
  );

  const [pokemonList, setPokemonList, subscribePokemonList] = useAtom(
    ATOM_KEYS.POKEMON_LIST
  );

  const handleClickSurprise = (e) => {
    e.stopPropagation();
    setPokemonListPagination({
      limit: 12,
      offset: randomNumber(0, 100),
    });
  };

  const handleChangeSort = (e) => {
    e.stopPropagation();
    const { value } = e.target;
    const newPokemonList = [...pokemonList()];

    if (value === "1") {
      newPokemonList.sort((a, b) => Number(a.id) - Number(b.id));
    } else {
      newPokemonList.sort((a, b) => Number(b.id) - Number(a.id));
    }

    setPokemonList(newPokemonList);
  };

  return new withComponent(PokemonFilter, {}, [
    handleClickSurprise,
    handleChangeSort,
  ]).createJsonDom();
};
