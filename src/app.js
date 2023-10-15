import {
  SearchFormElement,
  MainTitleElement,
  PokemonSectionElement,
} from "./components/index.js";
import { createStore } from "./lib/index.js";

export const store = createStore();

(() => {
  const rootNodes = [
    MainTitleElement,
    SearchFormElement,
    PokemonSectionElement,
  ];
  const rootElement = document.getElementById("root");
  rootNodes.forEach((node) => rootElement.appendChild(node()));
})();
