import React, { FC } from 'react';
import { FilmList } from '@components/film-list';
import { useQuery } from '@apollo/client';
import query from './films.graphql';
import { SearchForm } from '@components/search-form';
import { Film } from '@packages/data';

interface MovieAppProps {
    searchString: string;
}

export const MovieApp: FC<MovieAppProps> = ({ searchString }) => {

    // below loading state is available during SSR
    const [ loadingState, setLoadingState ] = React.useState<boolean>(true);

    // graphql data loading state will be defined only after graphql queries on browser
    const { loading, error, data } = useQuery(query);

    // stores the filtered list based on the search string in search form component
    const [ filteredFilms, setFilteredFilms ] = React.useState<Film[]>([]);

    React.useEffect(() => {
        setLoadingState(loading); // Turns false on browser after successful graphql query execution
    }, [loading]);

    if (loadingState) {
        return <div>Star Wars Films are getting fetched ...</div>;
    }

    return (
        <div className="flex flex-col">
            <SearchForm searchStrProp={searchString}
                films={data && data.allFilms && data.allFilms.films}
                setFilteredFilms={(films) => setFilteredFilms(films)} />
            <FilmList films={filteredFilms} />
        </div>
    );
};
