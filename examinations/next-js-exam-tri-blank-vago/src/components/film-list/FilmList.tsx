import React, { FC } from 'react';
import { Film } from '@packages/data';
import { FilmListItem } from './FilmListItem';

interface FilmListProps {
    films: Film[];
}

export const FilmList: FC<FilmListProps> = ({ films }) => {

    const listItems = films.map((film) => {
        return (
            <FilmListItem key={film.id} film={film}/>
        );
    });

    return (
        <ul className="w-full border-4 border-indigo-500 rounded-sm">
            {listItems}
        </ul>
    );
};
