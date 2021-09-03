import { _EditWodForm, _EditWodImg, _EditWodImgContainer, _EditWodImgTitle, _EditWodSpan, _EditWodSubContainer, _EditWodTextArea } from "@/theme/components/_EditWod"
import { allWods } from "@/__generated__/allWods";
import { wod, wodVariables } from "@/__generated__/wod";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async"
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom"
import { ALL_WODS } from "./wod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ModalBase from "../modal-base";
import { editWodMutation, editWodMutationVariables } from "@/__generated__/editWodMutation";
import { changeDateToTitle } from "../coach/create-wod";

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
}

export const EditWod = () => {
    const {id} = useParams<IParams>();
    const ref = useRef<HTMLTextAreaElement>(null);
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const { data:wods } = useQuery<allWods>(ALL_WODS);
    const {data:wod} = useQuery<wod, wodVariables>(
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
            const { title, date, content} = getValues();
            let titleDateSum = changeDateToTitle(date);
            
            editWodMutation({
                variables:{
                    editWodInput:{
                        title:titleDateSum,
                        content,
                        titleDate:date,
                        wodId:+id
                    }
                }
            })
        } catch (e) {
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

    
    return (
        <>
            <Helmet>
                <title>Edit Wod | CrossfiTogether</title>
            </Helmet>
            <_EditWodImgContainer>
                <_EditWodImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_EditWodImg> 
                <_EditWodImgTitle>Edit WOD</_EditWodImgTitle>
            </_EditWodImgContainer>
            <div>{wod?.wod.wod?.content}</div>
            <_EditWodSubContainer>
                <_EditWodForm  onSubmit={handleSubmit(onSubmit)}>
                    <_EditWodSpan>WOD Title</_EditWodSpan>
                    <Controller 
                        name="date" 
                        control={control}
                        render= {({ field }) => (
                        <DatePicker
                            className="input"
                            dateFormat="yyMMdd"
                            onChange={(e) => field.onChange(e)}
                            selected={field.value}
                            excludeDates={excludeDates}
                            customInput={React.createElement(ExampleCustomInput)}
                            isClearable={true}
                        />
                        )}
                    />
                    <_EditWodSpan>WOD Content</_EditWodSpan>
                    <_EditWodTextArea
                        {...register("content", {
                            required: "Content is required",
                        })}
                        name="content"
                        className="textarea"
                        ref={ref}
                        onInput={handleResizeHeight}
                    >{wod?.wod.wod?.content}</_EditWodTextArea>
                    {errors.content?.message && (  
                        <FormError errorMessage={errors.content?.message} />
                    )}
                    <Button canClick={formState.isValid} loading={loading} actionText={"EDIT WOD"} />
                    {editWodMutationResult?.editWod.error && <FormError errorMessage={editWodMutationResult.editWod.error}/>}
                </_EditWodForm>
                <ModalBase visible={isOpen} onClose={handleModalClose} modalContentText={"Welcome To CrossfiTogether"} modalButtonText={"SIGN IN NOW"}> </ModalBase>
            </_EditWodSubContainer>
        </>
    )
}