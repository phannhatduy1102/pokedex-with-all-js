export const transformPokemonOrder = (order) => {
  if (order < 10) return `#00${order}`;
  if (order < 100) return `#0${order}`;
  return `#${order}`;
};

export const randomPokemonTypeColor = () => {
  const pokemonTypeColor = [
    "#A8A878",
    "#C03028",
    "#A890F0",
    "#A040A0",
    "#E0C068",
    "#B8A038",
    "#A8B820",
    "#705898",
    "#B8B8D0",
    "#F08030",
    "#6890F0",
    "#78C850",
    "#F8D030",
    "#F85888",
    "#98D8D8",
    "#7038F8",
    "#705848",
    "#EE99AC",
  ];

  return pokemonTypeColor[Math.floor(Math.random() * pokemonTypeColor.length)];
};

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
