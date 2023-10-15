import { withComponent } from "../utils/index.js";

function MainTitle(props) {
  const { text } = props;
  const jsonDom = {
    type: "div",
    className: "title pl-4 py-4",
    children: [
      {
        type: "h1",
        text,
        className: "text-[30px] text-[#919191] leading-[37.5px]",
      },
    ],
  };
  return {
    jsonDom,
  };
}

export const MainTitleElement = () =>
  new withComponent(MainTitle, { text: "Pokédex" }, []).createJsonDom();
