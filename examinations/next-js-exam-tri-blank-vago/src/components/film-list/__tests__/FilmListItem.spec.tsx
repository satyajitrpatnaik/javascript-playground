import React from 'react';
import { FilmListItem } from '../FilmListItem';
import { Film, FILMS } from '@packages/data';
import { render, screen } from '@testing-library/react';

describe('FilmListItem', () => {
    let firstFilm: Film; 

    beforeEach(() => {
        firstFilm = FILMS[0];
        render(<FilmListItem film={firstFilm} />);
    });

    it('should render a single film item', () => {
        const titleElement = screen.getByText(firstFilm.title);
        const directorElement = screen.getByText(firstFilm.director);

        expect(titleElement).toBeDefined();
        expect(directorElement).toBeDefined();
    });

    it("should render a single film item which has release date", () => {
        const releaseDateElement = screen.getByText(firstFilm.releaseDate);
        expect(releaseDateElement).toBeDefined();
    });
});
