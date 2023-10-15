import {
  withComponent,
  randomPokemonTypeColor,
  transformPokemonOrder,
} from "../../utils/index.js";

function PokemonItem(props) {
  const { pokemon } = props;

  const jsonDom = {
    type: "li",
    className: "pokemon-item",
    children: [
      {
        type: "div",
        className: "flex flex-col",
        children: [
          {
            type: "div",
            className:
              "relative pt-[100%] bg-[#F2F2F2] border-rounded rounded-md",
            children: [
              {
                type: "img",
                className: "absolute top-0",
                src: pokemon.image,
                alt: pokemon.name,
              },
            ],
          },
          {
            type: "div",
            className: "pl-4",
            children: [
              {
                type: "p",
                className:
                  "pokemon-order text-[#919191] text-[13px] font-medium",
                text: transformPokemonOrder(pokemon.order),
              },
              {
                type: "p",
                className:
                  "pokemon-name my-1 text-[#313131] text-[24px] font-medium capitalize",
                text: pokemon.name,
              },
              {
                type: "div",
                className:
                  "flex pokemon-type-list gap-1 text-[#212121] text-center text-[12px] pb-6",
                children: pokemon.types.map((type) => ({
                  type: "div",
                  className: `pokemon-type border-rounded rounded w-[72px] text-[#fff] capitalize bg-[${randomPokemonTypeColor()}]`,
                  text: type,
                })),
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

export const PokemonItemElement = (props) =>
  new withComponent(PokemonItem, props).createJsonDom();
