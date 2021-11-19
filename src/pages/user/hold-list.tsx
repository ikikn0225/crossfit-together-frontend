import { _HoldSpan } from "@/theme/_Hold";
import { allHolds } from "@/__generated__/allHolds";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

export const ALL_HOLDS = gql`
    query allHolds($input:AllHoldsInput!){
        allHolds(input:$input){
            error
            ok
            holds {
                id
                holdAt
                owner {
                    id
                    name
                }
            }
        }
    }
`;



interface IHoldListProps {
    holdAt:Date;
    ownerId:number;
    ownerName:string;
}

export const HoldList:React.FC<IHoldListProps> = ({holdAt, ownerId, ownerName}) => {
    const { data:allHolds } = useQuery<allHolds>(ALL_HOLDS, {
        variables: {
            input: {
                holdAt
            }
        }
    });
console.log(allHolds);

    return(
        <>
        {allHolds?.allHolds.holds?.length !== 0
        &&(
            allHolds?.allHolds.holds?.map((hold) => (
                <_HoldSpan key={hold.id}>{hold.holdAt.toString().substring(0, 10)}</_HoldSpan>

            ))
        )}

        </>
    );
}