import React, { FC } from 'react';
import { Person } from '@packages/data';
import { Modal } from '@components/modal';
import { CharacterListItem, CharacterDetails } from '@components/character-list';

interface CharacterListProps {
    characters: Person[]
}

export const CharacterList: FC<CharacterListProps> = ({ characters }) => {

    const [ isCharacterDetailsModalOpen, setIsCharacterDetailsModalOpen ] = React.useState<boolean>(false);
    const [ selectedCharacter, setSelectedCharacter ] = React.useState<any>(null);

    const onClickHandler = (event: any, character: Person) => {
        event.stopPropagation();
        setSelectedCharacter(character);
        setIsCharacterDetailsModalOpen(true);
    }

    const onModalCloseHandler = (event: any) => {
        event.stopPropagation();
        setIsCharacterDetailsModalOpen(false);
    }

    return (
        <>
            <ul data-testid="character-list">
                { characters.map(character => 
                    <CharacterListItem key={character.name} 
                        character={character} 
                        onClick={(event) => onClickHandler(event, character)}
                    />
                )}
            </ul>
            { selectedCharacter && 
                <Modal title={selectedCharacter.name} open={isCharacterDetailsModalOpen} 
                    onClose={(event) => onModalCloseHandler(event)}>
                    <CharacterDetails character={selectedCharacter}/>
                </Modal>
            }
        </>
    );
}
