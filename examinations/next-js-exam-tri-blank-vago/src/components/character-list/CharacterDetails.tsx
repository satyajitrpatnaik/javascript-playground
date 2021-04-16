import React from 'react';
import { Person } from '@packages/data';

interface CharacterDetailsProps {
  character: Person
}

export const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character }) => {
  return (
    <div>
      {/* {
        Object.entries(character).map(([key, value], index) => {
          return (
            <div key={key}>
              <label>{key} : </label>
              <span>{value}</span>
            </div>
          );
        })
      } */}
      <div>
        <label>Birth Year: </label>
        <span>{character.birthYear}</span>
      </div>
      <div>
        <label>Eye Color: </label>
        <span>{character.eyeColor}</span>
      </div>
      <div>
        <label>Gender: </label>
        <span>{character.gender}</span>
      </div>
      <div>
        <label>Height: </label>
        <span>{character.height}</span>
      </div>
      <div>
        <label>Mass: </label>
        <span>{character.mass}</span>
      </div>
      <div>
        <label>Skin Color: </label>
        <span>{character.skinColor}</span>
      </div>
      <div>
        <label>Name of their home world: </label>
        <span>{character.homeworld.name}</span>
      </div>
    </div>
  );
}