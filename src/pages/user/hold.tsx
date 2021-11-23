import { Button } from "@/components/button"
import { FormError } from "@/components/form-error"
import { _HoldImg, _HoldImgContainer, _HoldImgTitle, _HoldContainer, _HoldSubContainer, _HoldForm, _HoldCalendarButton, _HoldListContainer, _HoldNoContent, _HoldSpan, _HoldListTitle, _HoldMemberListContainer } from "@/theme/_Hold"
import { Helmet } from "react-helmet-async"
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { registerHold, registerHoldVariables } from "@/__generated__/registerHold";
import { changeDateToTitle } from "../coach/create-wod";
import React, { useEffect, useState } from "react";
import { ALL_SPECIFIC_HOLDS, HoldMemberList } from "./hold-member-list";
import { allDistinctHolds } from "@/__generated__/allDistinctHolds";
import { myHolds } from "@/__generated__/myHolds";
import { useMe } from "@/hooks/useMe";

export const ALL_DISTINCT_HOLDS = gql`
    query allDistinctHolds($input:AllDistinctHoldsInput!) {
        allDistinctHolds(input:$input) {
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

export const REGISTER_HOLD = gql`
    mutation registerHold($input:RegisterHoldInput!) {
        registerHold(input:$input) {
            error
            ok
            holdId
        }
    }
`;

export const MY_HOLDS = gql`
    query myHolds {
        myHolds {
            error
            ok
            holds {
                id
                holdAt
            }
        }
    }
`;

interface IRegisterHoldForm {
    date: Date;
}

interface IHoldListProps {
    id:number;
    holdAt:Date;
    owner:IOwner;
}

interface IOwner {
    id:number;
    name:string;
}

const ExampleCustomInput = React.forwardRef<HTMLInputElement, { value: any; onClick(): void }>(
    ({ value, onClick }, ref) => {
    
    if({value}.value.length !== 0) {
        return <_HoldCalendarButton type="button" className="example-custom-input" onClick={onClick}>
            {value}
        </_HoldCalendarButton>
    } else {
        return <_HoldCalendarButton type="button" className="example-custom-input" onClick={onClick}>
            Select Hold Date
        </_HoldCalendarButton>
    }
});

export const Hold = () => {
    const client = useApolloClient();
    const { data:me } = useMe();
    const { data:allDistinctHolds } = useQuery<allDistinctHolds>(ALL_DISTINCT_HOLDS, {
        variables: {
            input: {
                affiliatedBoxId:me?.me.affiliatedBoxId
            }
        }
    });
    const { data:myHolds } = useQuery<myHolds>(MY_HOLDS);
    // console.log(allDistinctHolds);
    
    const onCompleted = (data:registerHold) => {
        const {
            registerHold: { ok, holdId },
        } = data;
        if(ok) {
            // handleModalOpen();
            const { date } = getValues();
            const existingDistinctHolds = client.readQuery({ query: ALL_DISTINCT_HOLDS, variables: { input: {affiliatedBoxId:me?.me.affiliatedBoxId}}});
            client.writeQuery({
                query: ALL_DISTINCT_HOLDS, variables: { input: {affiliatedBoxId:me?.me.affiliatedBoxId}},
                data: {
                    allDistinctHolds: {
                        ...existingDistinctHolds.allDistinctHolds,
                        holds: [
                            {
                                id:holdId,
                                holdAt:date,
                                __typename: 'AllDistinctHoldsOutput'
                            },
                            ...existingDistinctHolds.allDistinctHolds.holds,
                        ],
                    },
                },
            });

            const existingSpecificHolds = client.readQuery({ query: ALL_SPECIFIC_HOLDS, variables: { input: {holdAt:date}}});
            if(existingSpecificHolds) {
                client.writeQuery({
                    query: ALL_SPECIFIC_HOLDS, variables: { input: {holdAt:date}},
                    data: {
                        allSpecificHolds: {
                            ...existingSpecificHolds.allSpecificHolds,
                            holds: [
                                {
                                    id:holdId,
                                    holdAt:date,
                                    __typename: 'AllSpecificHoldsOutput'
                                },
                                ...existingSpecificHolds.allSpecificHolds.holds,
                            ],
                        },
                    },
                });
            } else {
                client.writeQuery({
                    query: ALL_SPECIFIC_HOLDS, variables: { input: {holdAt:date}},
                    data: {
                        allSpecificHolds: {
                            holds: [
                                {
                                    id:holdId,
                                    holdAt:date,
                                    __typename: 'AllSpecificHoldsOutput'
                                }
                            ],
                        },
                    },
                });
            }
        }

    }

    const [registerHold, { loading, data:registerHoldResult }] = useMutation<registerHold, registerHoldVariables>(REGISTER_HOLD, {
        onCompleted,   
    });

    const { register, control, getValues, watch, formState: { errors }, handleSubmit, formState } = useForm<IRegisterHoldForm>({
        mode:"onChange",
    });

    const onSubmit = () => {
        try {
            const { date } = getValues();
            registerHold({
                variables: {
                    input: {
                        holdAt:date,
                    }
                }
            })
        } catch (e:any) {
            console.log(e.response.data);
        }
    }

    //즉시 실행함수로 excludeDates 함수 생성
    let excludeDates:Date[]|undefined = new Array();
    module.exports = (function isWeekday() {
        if(myHolds?.myHolds.holds.length !== 0) {
            const holdList = myHolds?.myHolds.holds.map((hold:any) => { 
                return new Date(hold.holdAt); 
            });
            excludeDates = holdList;
        }
    })();

    return(
        <>
            <Helmet>
                <title>Hold | CrossfiTogether</title>
            </Helmet>
            <_HoldImgContainer>
                <_HoldImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_HoldImg> 
                <_HoldImgTitle>Hold</_HoldImgTitle>
            </_HoldImgContainer>
            <_HoldContainer>
                <_HoldSubContainer>
                    <_HoldForm  onSubmit={handleSubmit(onSubmit)}>
                        <Controller 
                            name="date" 
                            control={control}
                            render= {({ field }) => (
                            <DatePicker
                                className="input"
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select WOD Date"
                                onChange={(e) => field.onChange(e)}
                                selected={field.value}
                                excludeDates={excludeDates}
                                customInput={React.createElement(ExampleCustomInput)}
                            />
                            )}
                        />
                        <Button canClick={formState.isValid} loading={loading} actionText={"POST"} />
                        {registerHoldResult?.registerHold.error && <FormError errorMessage={registerHoldResult.registerHold.error}/>}
                    </_HoldForm>
                    <_HoldListContainer>
                        {allDistinctHolds?.allDistinctHolds?.holds?.length !== 0
                        ? (
                            allDistinctHolds?.allDistinctHolds.holds?.map((hold:IHoldListProps) => (
                                <div key={hold.id}>
                                    <_HoldListTitle>{hold.holdAt.toString().substring(0, 10)}</_HoldListTitle>
                                    <_HoldMemberListContainer>
                                        {/* <HoldMemberList
                                            holdAt={hold.holdAt}
                                            ownerId={hold.owner.id}
                                            ownerName={hold.owner.name}
                                            meId={me?.me.id}
                                            affiliatedBoxId={me?.me.affiliatedBoxId}
                                        /> */}
                                    </_HoldMemberListContainer>
                                </div>
                            ))
                        )
                        :(
                            <_HoldNoContent>Sorry, No Rep!</_HoldNoContent>
                        )}
                    </_HoldListContainer>
                </_HoldSubContainer>
            </_HoldContainer>
        </>
    )
}