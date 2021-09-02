import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { _CreateWodForm, _CreateWodInput, _CreateWodSpan, _CreateWodTextArea, _CreateWodSubContainer, _CreateWodImgContainer, _CreateWodImg, _CreateWodImgTitle} from "@/theme/components/_CreateWod";
import { _Container, _SubContainer } from "@/theme/components/_Layout";
import { _WodImg, _WodImgContainer, _WodImgTitle } from "@/theme/components/_Wod";
import { gql, useMutation, useQuery } from "@apollo/client";
import { createWodMutation, createWodMutationVariables } from "@/__generated__/createWodMutation";
import { allWods } from "@/__generated__/allWods";
import React, { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ALL_WODS } from "../user/wod";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import ModalBase from "../modal-base";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const CREATE_WOD_MUTATION = gql`
    mutation createWodMutation($createWodInput: CreateWodInput!) {
        createWod(input:$createWodInput) {
            ok
            error
        }
    }
`;

interface ICreateWodForm {
    date: Date;
    title: string;
    content: string;
}

const ExampleCustomInput = React.forwardRef<HTMLInputElement, { value: any; onClick(): void }>(
    ({ value, onClick }, ref) => {
    
    if({value}.value.length !== 0) {
        return <button className="example-custom-input" onClick={onClick}>
            {value}
        </button>
    } else {
        return <button className="example-custom-input" onClick={onClick}>
            Select WOD Date
        </button>
    }
});

export const CreateWod = () => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const { data:wods } = useQuery<allWods>(ALL_WODS);

    const onCompleted = (data:createWodMutation) => {
        const {
            createWod: { ok },
        } = data;
        if(ok) {
            history.push("/wod");
            location.reload();
        }

    }
    const [createWodMutation, { loading, data:createWodMutationResult }] = useMutation<createWodMutation, createWodMutationVariables>(CREATE_WOD_MUTATION, {
        onCompleted,   
    });

    const { register, control, getValues, watch, formState: { errors }, handleSubmit, formState } = useForm<ICreateWodForm>({
        mode:"onChange",
    });

    const onSubmit = async() => {
        try {
            const { title, content, date } = getValues();
            let titleDateSum = changeDateToTitle(date);

            createWodMutation({
                variables: {
                    createWodInput: {
                        title:titleDateSum,
                        content,
                        titleDate:date
                    }
                }
            })
        } catch (e) {
            console.log(e.response.data);
        }
    }

    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
        history.push("/");
    };

    const handleResizeHeight = useCallback(() => {
        if (ref === null || ref.current === null) {
            return;
        }
        ref.current.style.height = '100px';
        ref.current.style.height = ref.current.scrollHeight + 'px';
    }, []);

    const changeDateToTitle = (date:Date) => {
        let titleYear = date.getFullYear().toString().substring(2, 4);
        let titleMonth = date.getMonth()+1;
        let titleDate = date.getDate();
        let titleDateSum = "";
        
        if(titleMonth >= 10 && titleDate >= 10) {
            return titleDateSum = `${titleYear}${titleMonth}${titleDate}`
        }
        if(titleMonth >= 10 && titleDate < 10) {
            return titleDateSum = `${titleYear}${titleMonth}0${titleDate}`;
        }
        if(titleMonth < 10 && titleDate >= 10) {
            return titleDateSum = `${titleYear}0${titleMonth}${titleDate}`;
        }
        if(titleMonth < 10 && titleDate < 10) {
            return titleDateSum = `${titleYear}0${titleMonth}0${titleDate}`;
        }
        return "";
    }

    //즉시 실행함수로 excludeDates 함수 생성
    let excludeDates:Date[]|undefined = new Array();
    (function isWeekday() {
        const wodsList = wods?.allWods.wods?.map((wod:any) => { return new Date(wod.titleDate); });
        excludeDates = wodsList;
    })();
    
    return(
        <>
            <Helmet>
                <title>Create Wod | CrossfiTogether</title>
            </Helmet>
            <_CreateWodImgContainer>
                <_CreateWodImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_CreateWodImg> 
                <_CreateWodImgTitle>Create WOD</_CreateWodImgTitle>
            </_CreateWodImgContainer>
            <_CreateWodSubContainer>
                <_CreateWodForm  onSubmit={handleSubmit(onSubmit)}>
                    <_CreateWodSpan>WOD Title</_CreateWodSpan>
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
                            excludeDates={excludeDates}
                            customInput={React.createElement(ExampleCustomInput)}
                        />
                        )}
                    />
                    <_CreateWodSpan>WOD Content</_CreateWodSpan>
                    <_CreateWodTextArea 
                        {...register("content", {
                            required: "Content is required",
                        })}
                        name="content"
                        placeholder="Content"
                        className="textarea"
                        ref={ref}
                        onInput={handleResizeHeight}
                    />
                    {errors.content?.message && (  
                        <FormError errorMessage={errors.content?.message} />
                    )}
                    <Button canClick={formState.isValid} loading={loading} actionText={"CREATE WOD"} />
                    {createWodMutationResult?.createWod.error && <FormError errorMessage={createWodMutationResult.createWod.error}/>}
                </_CreateWodForm>
                <ModalBase visible={isOpen} onClose={handleModalClose} modalContentText={"Welcome To CrossfiTogether"} modalButtonText={"SIGN IN NOW"}> </ModalBase>
            </_CreateWodSubContainer>
        </>
    );
}