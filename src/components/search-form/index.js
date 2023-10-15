import { withComponent } from "../../utils/index.js";
import { SearchInputElement } from "./SearchInput.js";

function SearchForm() {
  const jsonDom = {
    type: "section",
    className: "search-form pl-4 bg-[#313131]",
    children: [
      {
        type: "div",
        className: "flex text-[#fff] py-8 gap-x-[48px]",
        children: [
          {
            type: "div",
            className: "search-col basis-[40%]",
            children: [
              {
                type: "h2",
                className: "text-[26px] font-normal",
                text: "Name or Number",
              },
              {
                type: "element",
                element: SearchInputElement(),
              },
              {
                type: "div",
                className: "search-sub-title pt-3",
                children: [
                  {
                    type: "span",
                    text: "Use the Advanced Search to explore Pokémon by type,weakness,Ability,and more!",
                  },
                ],
              },
            ],
          },
          {
            type: "div",
            className: "search-desc w-[430px] pt-3",
            children: [
              {
                type: "div",
                className:
                  "search-desc-content text-[20px] bg-[#4dad5b] p-4 pb-6 border-rounded rounded-lg",
                text: "Search for a Pokémon by name or using its National Pokédex number.",
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

export const SearchFormElement = () =>
  new withComponent(SearchForm).createJsonDom();
