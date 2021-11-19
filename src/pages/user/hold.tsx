import { Button } from "@/components/button"
import { FormError } from "@/components/form-error"
import { _HoldImg, _HoldImgContainer, _HoldImgTitle, _HoldContainer, _HoldSubContainer, _HoldForm, _HoldCalendarButton, _HoldListContainer, _HoldNoContent, _HoldSpan, _HoldListTitle } from "@/theme/_Hold"
import { Helmet } from "react-helmet-async"
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { registerHold, registerHoldVariables } from "@/__generated__/registerHold";
import { changeDateToTitle } from "../coach/create-wod";
import React, { useEffect, useState } from "react";
// import { allHolds } from "@/__generated__/allHolds";
import { HoldList } from "./hold-list";
import { allDistinctHolds } from "@/__generated__/allDistinctHolds";

export const ALL_DISTINCT_HOLDS = gql`
    query allDistinctHolds {
        allDistinctHolds {
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
    const { data:allDistinctHolds } = useQuery<allDistinctHolds>(ALL_DISTINCT_HOLDS);
    console.log(allDistinctHolds);
    
    const onCompleted = (data:registerHold) => {
        const {
            registerHold: { ok },
        } = data;
        if(ok) {
            // handleModalOpen();
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
            let titleDateSum = changeDateToTitle(date);

            registerHold({
                variables: {
                    input: {
                        holdAt:titleDateSum,
                    }
                }
            })
        } catch (e:any) {
            console.log(e.response.data);
        }
    }

    //즉시 실행함수로 excludeDates 함수 생성
    // let excludeDates:Date[]|undefined = new Array();
    // module.exports = (function isWeekday() {
    //     const holdList = wods?.allWods.wods?.map((wod:any) => { 
    //         return new Date(wod.titleDate); 
    //     });
    //     excludeDates = wodsList;
    // })();

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
                            dateFormat="yyyyMMdd"
                            placeholderText="Select WOD Date"
                            onChange={(e) => field.onChange(e)}
                            selected={field.value}
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
                            //container 안에 holdlist 넣어주기 allHolds는 return값에 날짜 중복 제외, 날짜별 홀드를 가져와야한다.
                            <div key={hold.id}>
                                <_HoldListTitle>{hold.holdAt.toString().substring(0, 10)}</_HoldListTitle>
                                <HoldList
                                    holdAt={hold.holdAt}
                                    ownerId={hold.owner.id}
                                    ownerName={hold.owner.name}
                                />
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