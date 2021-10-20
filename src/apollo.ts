import { ApolloClient, createHttpLink, InMemoryCache, makeVar, Reference } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCALSTORAGE_TOKEN } from "./constants";
import { getCookie } from "./cookie";
import { concatPagination, relayStylePagination } from "@apollo/client/utilities";

// const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
const token = getCookie(LOCALSTORAGE_TOKEN);
// console.log(token);

// localStorage.clear();

export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: authTokenVar() || "",
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    credentials: 'include',
    cache: new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                        return isLoggedInVar();
                    },
                },
                token: {
                    read() {
                        return authTokenVar();
                    }
                },
                // wodList: relayStylePagination(),
                wodList: {
                    keyArgs:false,
                    merge(existing, incoming) {
                        if (!incoming) return existing
                        if (!existing) return incoming

                        const { items, ...rest } = incoming;
                        // let result = rest;
                        // result.items = [...existing.items, ...items]; // Merge existing items with the items from incoming
                        
                        return [...existing, ...incoming];
                        
                    }
                }
            },
        },
    },
    }),
});