import React, { FC } from 'react';
import { Person } from '@packages/data';

interface CharacterListItemProps {
	character: Person;
	onClick: (event: any) => void
}

export const CharacterListItem: FC<CharacterListItemProps> = ({ character, onClick }) => {
    return ( 
		<li className="text-red-800 border border-current cursor-pointer" onClick={onClick}>
			{character.name}
		</li>
	);
};
