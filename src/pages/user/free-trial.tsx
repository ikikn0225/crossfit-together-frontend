import { Button } from "@/components/button"
import { FormError } from "@/components/form-error"
import { _FreeTrialImg, _FreeTrialImgContainer, _FreeTrialMyTrialDateTitle, _FreeTrialMyTrialDate, _FreeTrialMyTrialDateLayout, _FreeTrialImgTitle, _FreeTrialContainer, _FreeTrialSubContainer, _FreeTrialForm, _FreeTrialCalendarButton, _FreeTrialListContainer, _FreeTrialNoContent, _FreeTrialSpan, _FreeTrialListTitle, _FreeTrialMemberListContainer } from "@/theme/components/_FreeTrial"
import { Helmet } from "react-helmet-async"
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { changeDateToTitle } from "../coach/create-wod";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMe } from "@/hooks/useMe";
import Spinner from "@/components/spinner";
import { distinctFreeTrialList } from "@/__generated__/distinctFreeTrialList";
import { myFreeTrial } from "@/__generated__/myFreeTrial";
import { registerFreeTrial, registerFreeTrialVariables } from "@/__generated__/registerFreeTrial";
import { ALL_SPECIFIC_FREETRIALS, FreeTrialMemberList } from "./free-trial-member-list";

export const DISTINCT_FREETRIAL_LIST = gql`
    query distinctFreeTrialList($first: Int, $after: Int) {
        distinctFreeTrialList(first: $first, after: $after) {
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                cursor
                node {
                    id
                    freeTrialAt
                    owner {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export const REGISTER_FREETRIAL = gql`
    mutation registerFreeTrial($input:RegisterFreeTrialInput!) {
        registerFreeTrial(input:$input) {
            error
            ok
            freeTrialId
        }
    }
`;

export const MY_FREETRIAL = gql`
    query myFreeTrial($input:MyFreeTrialInput!) {
        myFreeTrial(input:$input) {
            error
            ok
            freeTrial {
                id
                freeTrialAt
            }
        }
    }
`;

interface IRegisterFreeTrialForm {
    date: Date;
}

interface IFreeTrialListProps {
    id:number;
    freeTrialAt:Date;
    owner:IOwner;
}

interface IOwner {
    id:number;
    name:string;
}

export interface IFreeTrialEdge {
    cursor:number;
    node:IFreeTrialListProps;
}

const ExampleCustomInput = React.forwardRef<HTMLInputElement, { value: any; onClick(): void }>(
    ({ value, onClick }, ref) => {
    
    if({value}.value.length !== 0) {
        return <_FreeTrialCalendarButton type="button" className="example-custom-input" onClick={onClick}>
            {value}
        </_FreeTrialCalendarButton>
    } else {
        return <_FreeTrialCalendarButton type="button" className="example-custom-input" onClick={onClick}>
            Select FreeTrial Date
        </_FreeTrialCalendarButton>
    }
});

export const FreeTrial = () => {
    const client = useApolloClient();
    const loader = useRef<HTMLDivElement>(null);
    const [freeTrialTrigger, setFreeTrialTrigger] = useState<boolean>(false);
    const { data:me } = useMe();
    const delay = true;
    const { loading:distinctFreeTrialLoading, data:distinctFreeTrialList, fetchMore } = useQuery<distinctFreeTrialList>(DISTINCT_FREETRIAL_LIST, {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
    });
    const { data:myFreeTrial } = useQuery<myFreeTrial>(MY_FREETRIAL, {
        variables: {
            input: {
                affiliatedBoxId:me?.me.affiliatedBoxId
            }
        }
    });
    
    const onCompleted = (data:registerFreeTrial) => {
        const {
            registerFreeTrial: { ok, freeTrialId },
        } = data;
        
        if(ok) {
            const { date } = getValues();
            const existingDistinctFreeTrials = client.readQuery({ query: DISTINCT_FREETRIAL_LIST, variables: { input: {affiliatedBoxId:me?.me.affiliatedBoxId}}});
            client.writeQuery({
                query: DISTINCT_FREETRIAL_LIST, variables: { input: {affiliatedBoxId:me?.me.affiliatedBoxId}},
                data: {
                    distinctFreeTrialList: {
                        ...existingDistinctFreeTrials.distinctFreeTrialList,
                        edges: [
                            ...existingDistinctFreeTrials.distinctFreeTrialList.edges,
                            {
                                node: {
                                        id:freeTrialId,
                                        freeTrialAt:date,
                                        __typename: 'AllDistinctFreeTrialsOutput'
                                },
                                ...existingDistinctFreeTrials.distinctFreeTrialList.edges.node,
                            },
                        ],
                    },
                },
            });

            const existingSpecificFreeTrials = client.readQuery({ query: ALL_SPECIFIC_FREETRIALS, variables: { input: {freeTrialAt:date}}});
            if(existingSpecificFreeTrials) {
                client.writeQuery({
                    query: ALL_SPECIFIC_FREETRIALS, variables: { input: {freeTrialAt:date}},
                    data: {
                        allSpecificFreeTrials: {
                            ...existingSpecificFreeTrials.allSpecificFreeTrials,
                            freeTrials: [
                                {
                                    id:freeTrialId,
                                    freeTrialAt:date,
                                    __typename: 'AllSpecificFreeTrialsOutput'
                                },
                                ...existingSpecificFreeTrials.allSpecificFreeTrials.freeTrials,
                            ],
                        },
                    },
                });
            } else {
                client.writeQuery({
                    query: ALL_SPECIFIC_FREETRIALS, variables: { input: {freeTrialAt:date}},
                    data: {
                        allSpecificFreetrials: {
                            freeTrials: [
                                {
                                    id:freeTrialId,
                                    freeTrialAt:date,
                                    __typename: 'AllSpecificFreeTrialsOutput'
                                }
                            ],
                        },
                    },
                });
            }

            const existingMyFreeTrials = client.readQuery({ query: MY_FREETRIAL, variables: { input: {affiliatedBoxId:me?.me.affiliatedBoxId}}});
            client.writeQuery({
                query: MY_FREETRIAL, variables: { input: {affiliatedBoxId:me?.me.affiliatedBoxId}},
                data: {
                    myFreeTrial: {
                        ...existingMyFreeTrials.myFreeTrial,
                        freeTrial:
                        {
                            id:freeTrialId,
                            freeTrialAt:date,
                            __typename: 'FreeTrial'
                        },
                    },
                },
            });
        }
    }

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        setFreeTrialTrigger(target.isIntersecting);
    }, []);

    const fetchFreeTrial = async () => {
        setFreeTrialTrigger(false);
        await fetchMore({
            variables: {
                after:distinctFreeTrialList?.distinctFreeTrialList.pageInfo?.endCursor,
                delay,
            },
        })
    }

    useEffect(() => {   //일반 함수에는 gql 데이터가 들어가지 않아 트리거를 사용함.
        if(distinctFreeTrialList?.distinctFreeTrialList.pageInfo?.hasNextPage) {
            if(freeTrialTrigger) {
                fetchFreeTrial();
            }
        }
    }, [freeTrialTrigger]);
    
    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            thresfreeTrial: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if(loader && loader.current) {
            observer.observe(loader.current);
        }
    }, [handleObserver]);

    const [registerFreeTrial, { loading, data:registerFreeTrialResult }] = useMutation<registerFreeTrial, registerFreeTrialVariables>(REGISTER_FREETRIAL, {
        onCompleted,   
    });

    const { register, control, getValues, watch, formState: { errors }, handleSubmit, formState } = useForm<IRegisterFreeTrialForm>({
        mode:"onChange",
    });

    const onSubmit = () => {
        try {
            const { date } = getValues();
            registerFreeTrial({
                variables: {
                    input: {
                        freeTrialAt:date,
                    }
                }
            })
        } catch (e:any) {
            console.log(e.response.data);
        }
    }

    return(
        <>
            <Helmet>
                <title>FREE TRIAL | CrossfiTogether</title>
            </Helmet>
            <_FreeTrialImgContainer>
                <_FreeTrialImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_FreeTrialImg> 
                <_FreeTrialImgTitle>FREE TRIAL</_FreeTrialImgTitle>
            </_FreeTrialImgContainer>
            <_FreeTrialContainer>
                <_FreeTrialSubContainer>
                    <_FreeTrialForm  onSubmit={handleSubmit(onSubmit)}>
                        {myFreeTrial?.myFreeTrial.freeTrial !== null && myFreeTrial !== undefined
                        ?(
                            <_FreeTrialMyTrialDateLayout>
                                <_FreeTrialMyTrialDateTitle>Your Free Trial Date is</_FreeTrialMyTrialDateTitle>
                                <_FreeTrialMyTrialDate>{new Date(myFreeTrial?.myFreeTrial?.freeTrial.freeTrialAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })} 
                                            &nbsp;({new Date(myFreeTrial?.myFreeTrial?.freeTrial.freeTrialAt).toDateString().substring(0, 3)})</_FreeTrialMyTrialDate>
                            </_FreeTrialMyTrialDateLayout>
                        )
                        :(
                            <>
                                <Controller 
                                    name="date" 
                                    control={control}
                                    render= {({ field }) => (
                                    <DatePicker
                                        className="input"
                                        placeholderText="Select FreeTrial Date"
                                        onChange={(e) => field.onChange(e)}
                                        selected={field.value}
                                        showTimeSelect
                                        timeFormat="p"
                                        timeIntervals={10}
                                        dateFormat="Pp"
                                        customInput={React.createElement(ExampleCustomInput)}
                                    />
                                    )}
                                />
                                <Button canClick={formState.isValid} loading={loading} actionText={"POST"} />
                            </>
                        )}
                        {registerFreeTrialResult?.registerFreeTrial.error && <FormError errorMessage={registerFreeTrialResult.registerFreeTrial.error}/>}
                    </_FreeTrialForm>
                    <_FreeTrialListContainer>
                    {distinctFreeTrialList?.distinctFreeTrialList.edges?.length !== 0
                        ? (
                            distinctFreeTrialList?.distinctFreeTrialList.edges?.map((freeTrial:IFreeTrialEdge) => (
                                <div key={freeTrial.node.id}>
                                    <_FreeTrialListTitle>{new Date(freeTrial.node.freeTrialAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })} 
                                            &nbsp;({new Date(freeTrial.node.freeTrialAt).toDateString().substring(0, 3)})</_FreeTrialListTitle>
                                    <_FreeTrialMemberListContainer>
                                        <FreeTrialMemberList
                                            freeTrialAt={freeTrial.node.freeTrialAt}
                                            ownerId={freeTrial.node.owner.id}
                                            ownerName={freeTrial.node.owner.name}
                                            meId={me?.me.id}
                                            affiliatedBoxId={me?.me.affiliatedBoxId}
                                        />
                                    </_FreeTrialMemberListContainer>
                                </div>
                            ))
                        )
                        :(
                            <_FreeTrialNoContent>Sorry, No Rep!</_FreeTrialNoContent>
                        )}
                        {distinctFreeTrialLoading && 
                            <Spinner />
                        }
                        <div ref={loader} />
                    </_FreeTrialListContainer>
                </_FreeTrialSubContainer>
            </_FreeTrialContainer>
        </>
    )
}