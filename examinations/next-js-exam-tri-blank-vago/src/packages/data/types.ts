export type Film = {
  id: string;
  title: string;
  episodeID: number;
  openingCrawl: string;
  director: string;
  producers: string[];
  releaseDate: string;
  characterConnection: CharacterConnection;
};

export type CharacterConnection = {
  characters: Person[];
}

export type Person = {
  name: string;
  birthYear: string;
  eyeColor: string;
  gender: string;
  height: number;
  mass: number;
  skinColor: string;
  homeworld: Planet;
}

export type Planet = {
  name: string;
}