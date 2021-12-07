import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { 
    _CreateWodForm, 
    _CreateWodInput, 
    _CreateWodSpan, 
    _CreateWodTextArea, 
    _CreateWodSubContainer, 
    _CreateWodImgContainer, 
    _CreateWodImg, 
    _CreateWodImgTitle, 
    _CreateWodCalendarButton,
    _CreateWodCategorySelect
} from "@/theme/components/_CreateWod";
import { _Container, _SubContainer } from "@/theme/components/_Layout";
import { _WodImg, _WodImgContainer, _WodImgTitle } from "@/theme/components/_Wod";
import { gql, useMutation, useQuery } from "@apollo/client";
import { createWodMutation, createWodMutationVariables } from "@/__generated__/createWodMutation";
import { allWods } from "@/__generated__/allWods";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import ModalBase from "../modal-base";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { allCategories } from "@/__generated__/allCategories";

export const ALL_WODS = gql`
    query allWods($input:AllWodsInput!) {
        allWods(input:$input) {
            ok
            error
            wods {
                id
                title
                content
                titleDate
                likes {
                    id
                }
            }
        }
    }
`;

export const ALL_CATEGORIES = gql`
    query allCategories {
        allCategories {
            error
            ok
            categories {
                id
                name
                slug
            }
        }
    }
`;

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
    categoryId: number;
}

interface ICategoryParams {
    slug: string;
}

export const changeDateToTitle = (date:Date) => {
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

const ExampleCustomInput = React.forwardRef<HTMLInputElement, { value: any; onClick(): void }>(
    ({ value, onClick }, ref) => {
    
    if({value}.value.length !== 0) {
        return <_CreateWodCalendarButton type="button" className="example-custom-input" onClick={onClick}>
            {value}
        </_CreateWodCalendarButton>
    } else {
        return <_CreateWodCalendarButton type="button" className="example-custom-input" onClick={onClick}>
            Select WOD Date
        </_CreateWodCalendarButton>
    }
});

export const CreateWod = () => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const history = useHistory();
    const params = useParams<ICategoryParams>();
    const [isOpen, setIsOpen] = useState(false);
    const [stateOptions, setStateOptions] = useState("");
    
    // const { data:wods } = useQuery<allWods>(ALL_WODS);
    const { data:wods } = useQuery<allWods>(ALL_WODS, {
        variables: {
            input: {
                slug: params.slug,
            }
        }
    });
    const { data:categories } = useQuery<allCategories>(ALL_CATEGORIES);

    const onCompleted = (data:createWodMutation) => {
        const {
            createWod: { ok },
        } = data;
        if(ok) {
            handleModalOpen();
        }

    }
    const [createWodMutation, { loading, data:createWodMutationResult }] = useMutation<createWodMutation, createWodMutationVariables>(CREATE_WOD_MUTATION, {
        onCompleted,   
    });

    const { register, control, getValues, watch, formState: { errors }, handleSubmit, formState } = useForm<ICreateWodForm>({
        mode:"onChange",
    });

    const onSubmit = () => {
        try {
            const { title, content, date, categoryId } = getValues();
            let titleDateSum = changeDateToTitle(date);

            createWodMutation({
                variables: {
                    createWodInput: {
                        title:titleDateSum,
                        content,
                        titleDate:date,
                        categoryId:+categoryId
                    }
                }
            })
        } catch (e:any) {
            console.log(e.response.data);
        }
    }
    
    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
        history.push("/wods");
        location.reload();
    };

    const handleResizeHeight = useCallback(() => {
        if (ref === null || ref.current === null) {
            return;
        }
        ref.current.style.height = '100px';
        ref.current.style.height = ref.current.scrollHeight + 'px';
    }, []);

    //즉시 실행함수로 excludeDates 함수 생성
    let excludeDates:Date[]|undefined = new Array();
    module.exports = (function isWeekday() {
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
                    <_CreateWodSpan>WOD Category</_CreateWodSpan>
                    <_CreateWodCategorySelect 
                        {...register("categoryId", {
                            required: "Category is required",
                        })}
                        name="categoryId"
                        className="input"
                        onChange={e => setStateOptions(e.target.value)}
                        value={stateOptions}
                        >
                            {categories?.allCategories.categories.length !== 0 
                            ? (
                                categories?.allCategories.categories?.map((cate:{id:number; name:string}, index:number) => (<option key={index} value={cate.id}>{cate.name}</option>))
                            )
                            : (
                                <option value="" selected disabled>No Category here</option>  
                            )}
                            
                    </_CreateWodCategorySelect>
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
                    <Button canClick={formState.isValid} loading={loading} actionText={"CREATE WOD"} />
                    {createWodMutationResult?.createWod.error && <FormError errorMessage={createWodMutationResult.createWod.error}/>}
                </_CreateWodForm>
                <ModalBase visible={isOpen} onClose={handleModalClose} modalContentText={"CREATE WOD COMPLETED!"} modalButtonText={"Go To Wod List"}> </ModalBase>
            </_CreateWodSubContainer>
        </>
    );
}