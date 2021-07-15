import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { client } from './apollo';
import { App } from './components/app';


ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
        <HelmetProvider>
            <App />
        </HelmetProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

