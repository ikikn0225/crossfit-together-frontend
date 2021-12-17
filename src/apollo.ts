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
    uri: process.env.NODE_ENV === "production"
    ? 'https://crossfitogether0225.herokuapp.com/graphql'
    : 'http://localhost:4000/graphql',  
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
    // credentials: 'include',
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
                    wodList: relayStylePagination(),
                    distinctHoldList: relayStylePagination(),
                    distinctFreeTrialList: relayStylePagination(),
                    myFreeTrial: relayStylePagination(),
                    noticeList: relayStylePagination(),
                },
            },
        },
    }),
});