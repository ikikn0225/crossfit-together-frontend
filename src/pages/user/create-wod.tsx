import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { _CreateWodForm, _CreateWodInput, _CreateWodSpan, _CreateWodTextArea, _CreateWodSubContainer } from "@/theme/components/_CreateWod";
import { _Container, _SubContainer } from "@/theme/components/_Layout";
import { _WodImg, _WodImgContainer, _WodImgTitle } from "@/theme/components/_Wod";
import { gql, useMutation } from "@apollo/client";
import React, { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import ModalBase from "../modal-base";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import DatePicker, { DayValue, DayRange, Day } from '@hassanmojab/react-modern-calendar-datepicker'
// import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { createWodMutation, createWodMutationVariables } from "@/__generated__/createWodMutation";

const ExampleCustomInput = ({ value, onClick, ...rest }: {value: string; onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void}) => {
    
    if({value}.value.length !== 0) {
        return <button className="example-custom-input" onClick={onClick}>
            {value}
        </button>
    } else {
        return <button className="example-custom-input" onClick={onClick}>
            Select WOD Date
        </button>
    }
};

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

export const CreateWod = () => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(new Date());

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
            let titleYear = date.getFullYear();
            let titleMonth = date.getMonth()+1;
            let titleDate = date.getDate();
            let titleDateSum = "";
            
            if(titleMonth >= 10 && titleDate >= 10) {
                titleDateSum = `${titleYear}${titleMonth}${titleDate}`
            }
            if(titleMonth >= 10 && titleDate < 10) {
                titleDateSum = `${titleYear}${titleMonth}0${titleDate}`;
            }
            if(titleMonth < 10 && titleDate >= 10) {
                titleDateSum = `${titleYear}0${titleMonth}${titleDate}`;
            }
            if(titleMonth < 10 && titleDate < 10) {
                titleDateSum = `${titleYear}0${titleMonth}0${titleDate}`;
            }

            createWodMutation({
                variables: {
                    createWodInput: {
                        title:titleDateSum,
                        content
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

    // const formatInputValue = () => {
    //     if (!startDay) return '';
    //     let year = startDay.year+"";
    //     let month = startDay.month;
    //     let day = startDay.day;
    //     year = year.substring(2,4);
        
    //     if(month >= 10 && day >= 10) {
    //         return `${year}${month}${day}`;
    //     }
    //     if(month >= 10 && day < 10) {
    //         return `${year}${month}0${day}`;
    //     }
    //     if(month < 10 && day >= 10) {
    //         return `${year}0${month}${day}`;
    //     }
    //     if(month < 10 && day < 10) {
    //         return `${year}0${month}0${day}`;
    //     }

    //     return `${year}${month}${day}`;
    // };

    return(
        <>
            <Helmet>
                <title>Create Wod | CrossfiTogether</title>
            </Helmet>
            <_WodImgContainer>
                <_WodImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_WodImg> 
                <_WodImgTitle>Create WOD</_WodImgTitle>
            </_WodImgContainer>
            <_CreateWodSubContainer>
                <_CreateWodForm  onSubmit={handleSubmit(onSubmit)}>
                    <_CreateWodSpan>WOD Title</_CreateWodSpan>
                    {/* <DatePicker 
                        value={startDay} 
                        onChange={setStartDay}
                        colorPrimary="#075DC6"
                        calendarClassName="custom-calendar"
                        inputName="title"
                        inputPlaceholder="Select a WOD date"
                        formatInputText={formatInputValue}
                    /> */}
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