import React from 'react';
import { render, screen } from '@testing-library/react';
import { FILMS } from '@packages/data';
import { CharacterListItem } from '@components/character-list';

describe('CharacterListItem', () => {
  
  let character = FILMS[0].characterConnection.characters[0];
  beforeEach(() => {
    render(<CharacterListItem character={character} onClick={(e) => {}}/>);
  });
  
  it('should render a character', () => {
    const characterNameElement = screen.getByText(character.name);
    expect(characterNameElement).toBeDefined();
  });
});