import { myAffiliatedBoxQuery } from "@/__generated__/myAffiliatedBoxQuery";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

export const MY_AFFILIATED_BOX_QUERY = gql`
query myAffiliatedBoxQuery {
    myAffiliatedBox {
        affiliatedBox {
            id
            name
            coverImg
            address
        }
    }
}
`;

export const useMyBox = () => {
    return useQuery<myAffiliatedBoxQuery>(MY_AFFILIATED_BOX_QUERY);
}