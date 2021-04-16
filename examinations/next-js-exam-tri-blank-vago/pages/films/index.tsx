import React from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { MovieApp } from '@components/movie-app';
import { ApolloProvider } from '@packages/apollo';

const Home: NextPage = () => {
    const router = useRouter();
    const params = router.query;    
    return (
        <ApolloProvider>
            <main className="mt-8 flex justify-center items-center">
                <MovieApp searchString={params.search?.toString() || ''}/>
            </main>
        </ApolloProvider>
    );
};

export default Home;
