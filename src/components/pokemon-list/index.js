import { PokemonFilterElement } from "./pokemon-filter.js";
import { PokemonListElement } from "./pokemon-list.js";
import { LoadMoreElement } from "./load-more.js";
import { withComponent } from "../../utils/index.js";

function PokemonSection() {
  const jsonDom = {
    type: "section",
    className: "pokemon bg-[#fff] px-4",
    children: [
      {
        type: "div",
        className: "container pokemon-wrapper",
        children: [
          {
            type: "element",
            element: PokemonFilterElement(),
          },
          {
            type: "element",
            element: PokemonListElement(),
          },
          {
            type: "element",
            element: LoadMoreElement(),
          },
        ],
      },
    ],
  };

  return {
    jsonDom,
  };
}

export const PokemonSectionElement = () =>
  new withComponent(PokemonSection).createJsonDom();
