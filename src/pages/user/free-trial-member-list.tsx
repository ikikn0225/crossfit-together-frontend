import Spinner from "@/components/spinner";
import { useMe } from "@/hooks/useMe";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { faCheckSquare as faCheckSquareSolid, faWindowClose as faWindowCloseSolid, faCheck as faCheckSolid, faTimes as faTimesSolid, faPencilAlt as faPencelAltSolid } from "@fortawesome/free-solid-svg-icons";
import { DISTINCT_FREETRIAL_LIST, MY_FREETRIAL } from "./free-trial";
import { _FreeTrialFontAwesomeIcon, _FreeTrialInputButton, _FreeTrialSpan, _FreeTrialSpanContainer } from "@/theme/components/_FreeTrial";
import { allSpecificFreeTrials } from "@/__generated__/allSpecificFreeTrials";
import { deleteFreeTrial, deleteFreeTrialVariables } from "@/__generated__/deleteFreeTrial";
import { useEffect } from "react";

export const ALL_SPECIFIC_FREETRIALS = gql`
    query allSpecificFreeTrials($input:AllSpecificFreeTrialsInput!){
        allSpecificFreeTrials(input:$input){
            error
            ok
            freeTrials {
                id
                freeTrialAt
                owner {
                    id
                    name
                }
            }
        }
    }
`;

export const DELETE_FREETRIAL = gql`
    mutation deleteFreeTrial($input:DeleteFreeTrialInput!) {
        deleteFreeTrial(input:$input) {
            ok
            error
        }
    }
`;



interface IFreeTrialMemberListProps {
    freeTrialAt:Date;
    ownerId:number;
    ownerName:string;
    meId:undefined|number;
    affiliatedBoxId:undefined|null|number;
}

interface IFreeTrialMemberList {
    id:number;
    freeTrialAt:Date;
    owner:IOwner;
}

interface IOwner {
    id:number;
    name:string;
}
export const FreeTrialMemberList:React.FC<IFreeTrialMemberListProps> = ({freeTrialAt, ownerId, ownerName, meId, affiliatedBoxId}) => {
    const client = useApolloClient();
    
    const { data:allSpecificFreeTrials, loading:allSpecificFreeTrialsLoading } = useQuery<allSpecificFreeTrials>(ALL_SPECIFIC_FREETRIALS, {
        variables: {
            input: {
                freeTrialAt
            }
        }
    });
    
    const [ deleteFreeTrial, { loading:deleteLoading } ] = useMutation<deleteFreeTrial, deleteFreeTrialVariables>(DELETE_FREETRIAL, {
        onCompleted({ deleteFreeTrial }) {
                const existingDistinctFreeTrials = client.readQuery({ query: DISTINCT_FREETRIAL_LIST, variables: { input: {affiliatedBoxId}}});
                if(!existingDistinctFreeTrials) {
                    client.writeQuery({
                        query: DISTINCT_FREETRIAL_LIST, variables: { input: {affiliatedBoxId}},
                        data: {
                            distinctFreeTrialList: {
                                ...existingDistinctFreeTrials.distinctFreeTrialList,
                                edges: [
                                    ...existingDistinctFreeTrials.distinctFreeTrialList.edges,
                                    {
                                        deleteFreeTrial
                                    },
                                ],
                            },
                        },
                    });
                } else {
                    client.writeQuery({
                        query: DISTINCT_FREETRIAL_LIST, variables: { input: {affiliatedBoxId}},
                        data: {
                            distinctFreeTrialList: {
                                ...existingDistinctFreeTrials.distinctFreeTrialList,
                                edges: [
                                    ...existingDistinctFreeTrials.distinctFreeTrialList.edges,
                                    {
                                        deleteFreeTrial,
                                        ...existingDistinctFreeTrials.distinctFreeTrialList.edges.node,
                                    },
                                ],
                            },
                        },
                    });
                }

                const existingSpecificFreeTrials = client.readQuery({ query: ALL_SPECIFIC_FREETRIALS, variables: { input: {freeTrialAt}}});
                client.writeQuery({
                    query: ALL_SPECIFIC_FREETRIALS, variables: { input: {freeTrialAt}},
                    data: {
                        allSpecificFreeTrials: {
                            ...existingSpecificFreeTrials.allSpecificFreeTrials,
                            freeTrials: [
                                deleteFreeTrial,
                                ...existingSpecificFreeTrials.allSpecificFreeTrials.freeTrials,
                            ],
                        },
                    },
                });

                const existingMyFreeTrials = client.readQuery({ query: MY_FREETRIAL, variables: { input: {affiliatedBoxId}}});

                client.writeQuery({
                    query: MY_FREETRIAL, variables: { input: {affiliatedBoxId}},
                    data: {
                        myFreeTrial: {
                            ...existingMyFreeTrials.myFreeTrial,
                            freeTrial:null
                        },
                    },
                });
        }
    })

    const onClickWodDelete = async(freeTrialId:number) => {
        if(deleteLoading === false) {
            deleteFreeTrial({
                variables:{
                    input:{
                        id:freeTrialId,
                    }
                }
            })
        }
    }

    return(
        <>
        {allSpecificFreeTrials?.allSpecificFreeTrials.freeTrials?.length !== 0
        &&(
            allSpecificFreeTrials?.allSpecificFreeTrials.freeTrials?.map((freeTrial:IFreeTrialMemberList) => (
                <_FreeTrialSpanContainer key={freeTrial.id} freeTrialOwnerId={freeTrial.owner.id} meId={meId}>
                    <_FreeTrialSpan>{freeTrial.owner.name}</_FreeTrialSpan>
                    {freeTrial.owner.id == meId &&
                        <_FreeTrialInputButton type="button" onClick={()=>onClickWodDelete(freeTrial.id)} >
                            <_FreeTrialFontAwesomeIcon icon={faTimesSolid}/>
                        </_FreeTrialInputButton>
                    }
                </_FreeTrialSpanContainer>
            ))
        )}
        {allSpecificFreeTrialsLoading && 
            <Spinner />
        }

        </>
    );
}