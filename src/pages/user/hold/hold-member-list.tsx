import Spinner from "@/components/spinner";
import { useMe } from "@/hooks/useMe";
import { _HoldFontAwesomeIcon, _HoldInputButton, _HoldSpan, _HoldSpanContainer } from "@/theme/_Hold";
import { allSpecificHolds } from "@/__generated__/allSpecificHolds";
import { deleteHold, deleteHoldVariables } from "@/__generated__/deleteHold";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { DISTINCT_HOLD_LIST } from "./hold";
import { faCheckSquare as faCheckSquareSolid, faWindowClose as faWindowCloseSolid, faCheck as faCheckSolid, faTimes as faTimesSolid, faPencilAlt as faPencelAltSolid } from "@fortawesome/free-solid-svg-icons";

export const ALL_SPECIFIC_HOLDS = gql`
    query allSpecificHolds($input:AllSpecificHoldsInput!){
        allSpecificHolds(input:$input){
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

export const DELETE_HOLD = gql`
    mutation deleteHold($input:DeleteHoldInput!) {
        deleteHold(input:$input) {
            ok
            error
        }
    }
`;



interface IHoldMemberListProps {
    holdAt:Date;
    ownerId:number;
    ownerName:string;
    meId:undefined|number;
    affiliatedBoxId:undefined|null|number;
}

interface IHoldMemberList {
    id:number;
    holdAt:Date;
    owner:IOwner;
}

interface IOwner {
    id:number;
    name:string;
}
export const HoldMemberList:React.FC<IHoldMemberListProps> = ({holdAt, ownerId, ownerName, meId, affiliatedBoxId}) => {
    const client = useApolloClient();
    
    const { data:allSpecificHolds, loading:allSpecificHoldsLoading } = useQuery<allSpecificHolds>(ALL_SPECIFIC_HOLDS, {
        variables: {
            input: {
                holdAt
            }
        }
    });
    
    const [ deleteHold, { loading:deleteLoading } ] = useMutation<deleteHold, deleteHoldVariables>(DELETE_HOLD, {
        onCompleted({ deleteHold }) {
                // const existingDistinctHolds = client.readQuery({ query: ALL_DISTINCT_HOLDS, variables: { input: {affiliatedBoxId}}});
                const existingDistinctHolds = client.readQuery({ query: DISTINCT_HOLD_LIST, variables: { input: {affiliatedBoxId}}});
                if(!existingDistinctHolds) {
                    client.writeQuery({
                        query: DISTINCT_HOLD_LIST, variables: { input: {affiliatedBoxId}},
                        data: {
                            distinctHoldList: {
                                ...existingDistinctHolds.distinctHoldList,
                                edges: [
                                    ...existingDistinctHolds.distinctHoldList.edges,
                                    {
                                        deleteHold
                                    },
                                ],
                            },
                        },
                    });
                } else {
                    client.writeQuery({
                        query: DISTINCT_HOLD_LIST, variables: { input: {affiliatedBoxId}},
                        data: {
                            distinctHoldList: {
                                ...existingDistinctHolds.distinctHoldList,
                                edges: [
                                    ...existingDistinctHolds.distinctHoldList.edges,
                                    {
                                        deleteHold,
                                        ...existingDistinctHolds.distinctHoldList.edges.node,
                                    },
                                ],
                            },
                        },
                    });
                }

                const existingSpecificHolds = client.readQuery({ query: ALL_SPECIFIC_HOLDS, variables: { input: {holdAt}}});
                client.writeQuery({
                    query: ALL_SPECIFIC_HOLDS, variables: { input: {holdAt}},
                    data: {
                        allSpecificHolds: {
                            ...existingSpecificHolds.allSpecificHolds,
                            holds: [
                                deleteHold,
                                ...existingSpecificHolds.allSpecificHolds.holds,
                            ],
                        },
                    },
                });
        }
    })

    const onClickWodDelete = async(holdId:number) => {
        if(deleteLoading === false) {
            deleteHold({
                variables:{
                    input:{
                        id:holdId,
                    }
                }
            })
        }
    }

    return(
        <>
        {allSpecificHolds?.allSpecificHolds.holds?.length !== 0
        &&(
            allSpecificHolds?.allSpecificHolds.holds?.map((hold:IHoldMemberList) => (
                <_HoldSpanContainer key={hold.id} holdOwnerId={hold.owner.id} meId={meId}>
                    <_HoldSpan>{hold.owner.name}</_HoldSpan>
                    {hold.owner.id == meId &&
                        <_HoldInputButton type="button" onClick={()=>onClickWodDelete(hold.id)} >
                            <_HoldFontAwesomeIcon icon={faTimesSolid}/>
                        </_HoldInputButton>
                    }
                </_HoldSpanContainer>
            ))
        )}
        {allSpecificHoldsLoading && 
            <Spinner />
        }

        </>
    );
}