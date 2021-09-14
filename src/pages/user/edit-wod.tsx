import { _EditWodCategorySelect, _EditWodForm, _EditWodImg, _EditWodImgContainer, _EditWodImgTitle, _EditWodSpan, _EditWodSubContainer, _EditWodTextArea } from "@/theme/components/_EditWod"
import { allWods } from "@/__generated__/allWods";
import { wod, wodVariables } from "@/__generated__/wod";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async"
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom"
import { ALL_WODS } from "./wods";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ModalBase from "../modal-base";
import { editWodMutation, editWodMutationVariables } from "@/__generated__/editWodMutation";
import { ALL_CATEGORIES, changeDateToTitle } from "../coach/create-wod";
import { allCategories } from "@/__generated__/allCategories";

export const WOD_QUERY = gql `
    query wod($input:OneWodInput!) {
        wod(input:$input) {
            ok
            error
            wod {
                id
                title
                content
                titleDate
                category {
                    id
                    name
                    slug
                }
                likes {
                    id
                }
            }
        }
    }
`;

export const EDIT_WOD_MUTATION = gql`
    mutation editWodMutation($editWodInput:EditWodInput!) {
        editWod(input:$editWodInput) {
            ok
            error
        }
    }
`;

interface IParams {
    id: string;
}

interface IEditWodForm {
    date: Date;
    title: string;
    content: string;
    categoryId:number;
}

export const EditWod = () => {
    const {id} = useParams<IParams>();
    const ref = useRef<HTMLTextAreaElement>(null);
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const { data:wods } = useQuery<allWods>(ALL_WODS);
    const [stateOptions, setStateOptions] = useState("");
    const [stateContent, setStateContent] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const { data:categories } = useQuery<allCategories>(ALL_CATEGORIES);
    const { data:wod } = useQuery<wod, wodVariables>(
        WOD_QUERY,
        {
            variables: {
                input: {
                    wodId:+id,
                },
            },
        }
    );
    
    const onCompleted = (data:editWodMutation) => {
        const { editWod:{ok} } = data;
        if(ok) {
            handleModalOpen();
        }
    }

    const [ editWodMutation, { loading, data:editWodMutationResult } ] = useMutation<editWodMutation, editWodMutationVariables>(EDIT_WOD_MUTATION, {
        onCompleted,
    });

    const { register, control, getValues, watch, formState: { errors }, handleSubmit, formState } = useForm<IEditWodForm>({
        mode:"onChange",
    });

    const onSubmit = async() => {
        try {
            const { content, categoryId } = getValues();
            let titleDateSum = changeDateToTitle(startDate);

            editWodMutation({
                variables:{
                    editWodInput:{
                        title:titleDateSum,
                        content,
                        titleDate:startDate,
                        wodId:+id,
                        categoryId:+categoryId
                    }
                }
            })
        } catch (e:any) {
            console.log(e.response.data);
        }
    }

    const ExampleCustomInput = React.forwardRef<HTMLInputElement, { value: any; onClick(): void }>(
        ({ value, onClick }, ref) => {
        
        if({value}.value.length !== 0) {
            return <button className="example-custom-input" onClick={onClick}>
                {value}
            </button>
        } else {
            return <button className="example-custom-input" onClick={onClick}>
                {wod?.wod.wod?.title}
            </button>
        }
    });

    //즉시 실행함수로 excludeDates 함수 생성
    let excludeDates:Date[]|undefined = new Array();
    (function isWeekday() {
        const wodsList = wods?.allWods.wods?.map((wod:any) => { return new Date(wod.titleDate); });
        excludeDates = wodsList;
    })();

    const onDateChange = (date: Date) => {
        setStartDate(date);
    }

    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
        history.push("/wod");
        location.reload();
    };

    const handleResizeHeight = useCallback(() => {
        if (ref === null || ref.current === null) {
            return;
        }
        ref.current.style.height = '100px';
        ref.current.style.height = ref.current.scrollHeight + 'px';
    }, []);

    useEffect(() => {
        if(loading === false && wod) {
            const year = new Date(wod?.wod.wod?.titleDate).getFullYear();
            const month = new Date(wod?.wod.wod?.titleDate).getMonth();
            const date = new Date(wod?.wod.wod?.titleDate).getDate();
            setStartDate(new Date(year, month, date));
            setStateContent(wod?.wod.wod?.content+"");
            setStateOptions(wod?.wod.wod?.category.id+"");
        }
    }, [loading, wod]);

    return (
        <>
            <Helmet>
                <title>Edit Wod | CrossfiTogether</title>
            </Helmet>
            <_EditWodImgContainer>
                <_EditWodImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_EditWodImg> 
                <_EditWodImgTitle>Edit WOD</_EditWodImgTitle>
            </_EditWodImgContainer>
            <_EditWodSubContainer>
                <_EditWodForm  onSubmit={handleSubmit(onSubmit)}>
                <_EditWodSpan>WOD Category</_EditWodSpan>
                    <_EditWodCategorySelect 
                        {...register("categoryId", {
                            required: "Category is required",
                        })}
                        name="categoryId"
                        className="input"
                        onChange={e => setStateOptions(e.target.value)}
                        value={stateOptions}
                        >
                            {categories?.allCategories?.categories?.length !== 0 
                            ? (
                                categories?.allCategories.categories?.map((cate:{id:number; name:string}, index:number) => (<option key={index} value={cate.id}>{cate.name}</option>))
                            )
                            : (
                                <option value="" selected disabled>No Category here</option>  
                            )}
                    </_EditWodCategorySelect>
                    <_EditWodSpan>WOD Title</_EditWodSpan>
                    <Controller 
                        name="date" 
                        control={control}
                        render= {({ field }) => (
                        <DatePicker
                            className="input"
                            dateFormat="yyMMdd"
                            onChange={onDateChange}
                            selected={startDate}
                            excludeDates={excludeDates}
                            customInput={React.createElement(ExampleCustomInput)}
                        />
                        )}
                    />
                    <_EditWodSpan>WOD Content</_EditWodSpan>
                    <_EditWodTextArea
                        autoFocus 
                        {...register("content", {
                            required: "Content is required",
                        })}
                        name="content"
                        placeholder="Content"
                        className="textarea"
                        ref={ref}
                        onInput={handleResizeHeight}
                        defaultValue={stateContent}
                    ></_EditWodTextArea>
                    {errors.content?.message && (  
                        <FormError errorMessage={errors.content?.message} />
                    )}
                    <Button canClick={true} loading={loading} actionText={"EDIT WOD"} />
                    {editWodMutationResult?.editWod.error && <FormError errorMessage={editWodMutationResult.editWod.error}/>}
                </_EditWodForm>
                <ModalBase visible={isOpen} onClose={handleModalClose} modalContentText={"EDIT WOD COMPLETED!"} modalButtonText={"Go To Wod List"}> </ModalBase>
            </_EditWodSubContainer>
        </>
    )
}