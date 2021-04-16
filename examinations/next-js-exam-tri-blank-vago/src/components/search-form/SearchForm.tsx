import React from 'react';
import { Film } from '@packages/data';
import { CopyLink } from '@components/copy-link';

interface SearchFormProps {
    searchStrProp: string;
    films: Film[];
    setFilteredFilms: (films: Film[]) => void
}

export const SearchForm: React.FC<SearchFormProps> = ({ searchStrProp, films, setFilteredFilms }) => {

    const [ searchStringState, setSearchStringState ] = React.useState<string>('');

    // Any search string passed as props from the URL query params should be set in the state
    React.useEffect(() => {
        if (searchStrProp !== '') {
            setSearchStringState(searchStrProp);
        }
    }, [searchStrProp]);

    // As the search string changes, filtering of films list occurs, 
    // here we can use debounce to limit executions due to simultaneous key presses
    React.useEffect(() => {
        if (searchStringState !== '') {
            let newList = [];
            newList = films.filter(film => {
                return film.title.toLowerCase().includes(searchStringState.toLowerCase());
            });
            setFilteredFilms(newList); // filtered list based on the search string
        } else {
            setFilteredFilms(films); // if nothing is searched for, whole list is sent back
        }
    }, [searchStringState]);

    return (
        <div className="w-full relative mr-6 my-2">
            <input type="search"
                className="bg-purple-white shadow rounded border-0 p-3"
                placeholder="Search by film name..."
                value={searchStringState}
                onChange={(event) => setSearchStringState(event.target.value)}
            />
            <CopyLink searchString={searchStringState} />
            <div className="italic m-1"><strong>Note: </strong> 
                Please click on 'Copy Link' and paste in the address bar as URL to a filtered list of films.
            </div>
        </div>
    );
};
