import React from 'react';
import { render, screen } from '@testing-library/react';
import { CharacterList } from '@components/character-list';
import { Person, FILMS } from '@packages/data';

describe('CharacterList', () => {
    let characters: Person[];

    beforeEach(() => {
        characters = FILMS[0].characterConnection.characters;
        render(<CharacterList characters={characters} />);
	});
	
    it('should render the list of characters', () => {
		const characterListElement = screen.getByTestId('character-list');
		expect(characterListElement).toBeDefined();
	});
	
});
