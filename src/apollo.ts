import { ApolloClient, createHttpLink, InMemoryCache, makeVar, Reference } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCALSTORAGE_REFRESH_TOKEN, LOCALSTORAGE_TOKEN } from "./constants";
import { getCookie } from "./cookie";
import { concatPagination, relayStylePagination } from "@apollo/client/utilities";

const token = getCookie(LOCALSTORAGE_TOKEN);
// const refreshToken = getCookie(LOCALSTORAGE_REFRESH_TOKEN);
// let integratedToken:string;

// if((token && refreshToken) || (!token && !refreshToken)) {
//     integratedToken = token;
// } else {
//     integratedToken = refreshToken;
// }
// console.log("token: ", token);
// console.log("integratedToken: ", integratedToken);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
// export const refreshTokenVar = makeVar(refreshToken);

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
            // refreshtoken: refreshTokenVar() || "",
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
                    // refreshtoken: {
                    //     read() {
                    //         return refreshTokenVar();
                    //     }
                    // },
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