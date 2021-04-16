import React from 'react';
import { FilmList } from '../FilmList';
import { FILMS } from '@packages/data';
import { render, screen } from '@testing-library/react';

describe('FilmList', () => {

    beforeEach(() => {
        render(<FilmList films={FILMS} />);
    });

    it('should render a list of film titles', () => {
        const firstFilm = FILMS[0];
        const filmElement = screen.getByText(firstFilm.title);

        expect(filmElement).toBeDefined();
    });

    it('should render all films passed to it', () => {

        for (const film of FILMS) {
            expect(screen.getByText(film.title)).toBeDefined();
        }
    });
});
