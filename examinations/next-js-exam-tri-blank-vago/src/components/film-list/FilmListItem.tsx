import React, { FC, useState } from 'react';
import cn from 'classnames';

import { Film } from '@packages/data';
import { CharacterList } from '@components/character-list';

interface FilmListItemProps {
    film: Film
}

export const FilmListItem: FC<FilmListItemProps> = ({ film }) => {
    
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const accordionStyle = cn({
        hidden: !isOpen,
        block: isOpen,
    });
    
    return (
        <li onClick={() => setIsOpen((open) => !open)}
            className="p-1 border-gray-500 border-b-2 last:border-b-0">
            <h3 className="uppercase font-bold cursor-pointer">{film.title || ''}</h3>

            <div className={accordionStyle}>
                <div>
                    <label className="uppercase font-semibold">Director: </label>
                    <span className="text-purple-500">{film.director}</span>
                </div>
                <div>
                    <label className="uppercase font-semibold">Release Date:</label>
                    <span className="text-purple-500">{film.releaseDate}</span>
                </div>
                <div>
                    <label className="uppercase font-semibold">Characters</label>
                    <CharacterList characters={film.characterConnection.characters} />
                </div>
            </div>
        </li>
    );
};