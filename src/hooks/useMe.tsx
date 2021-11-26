import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { meQuery } from "@/__generated__/meQuery";

export const ME_QUERY = gql`
query meQuery {
    me {
        id
        name
        email
        role
        verified
        affiliatedBoxId
        profileImg
    }
}
`;

export const useMe = () => {
    return useQuery<meQuery>(ME_QUERY);
}