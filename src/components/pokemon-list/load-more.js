import { ATOM_KEYS } from "../../constants/index.js";
import { useAtom } from "../../lib/index.js";
import { withComponent } from "../../utils/index.js";

function LoadMore() {
  const jsonDom = {
    type: "div",
    className: "loadmore py-[50px] text-center",
    children: [
      {
        type: "button",
        className:
          "loadmore-btn bg-[#30a7d7] text-[#fff] px-5 py-3 border-rounded rounded-md",
        id: "loadmore",
        text: "Load more Pokémon",
        events: [
          {
            type: "click",
            key: 0,
          },
        ],
      },
    ],
  };
  return { jsonDom };
}

export const LoadMoreElement = () => {
  const [pokemonListPagination, setPokemonListPagination, subscribe] = useAtom(
    ATOM_KEYS.POKEMON_LIST_PAGINATION,
    {
      limit: 12,
      offset: 0,
    }
  );

  const handleClickLoadMore = () => {
    const { limit, offset } = pokemonListPagination();
    const newLimit = limit + 12;

    setPokemonListPagination({
      ...offset,
      limit: newLimit,
    });
  };

  return new withComponent(LoadMore, {}, [handleClickLoadMore]).createJsonDom();
};
