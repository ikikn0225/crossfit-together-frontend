import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { _CreateWodForm, _CreateWodInput, _CreateWodSpan, _CreateWodTextArea } from "@/theme/components/_CreateWod";
import { _Container, _SubContainer } from "@/theme/components/_Layout";
import { _WodImg, _WodImgContainer, _WodImgTitle } from "@/theme/components/_Wod";
import { gql, useMutation } from "@apollo/client";
import { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
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
    title: string;
    content: string;
}

export const CreateWod = () => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    // const [createAccountMutation, { loading, data:createAccountMutationResult }] = useMutation<createAccountMutation, createAccountMutationVariables>(CREATE_ACCOUNT_MUTATION, {
    //     onCompleted,   
    // });

    const { register, getValues, watch, formState: { errors }, handleSubmit, formState } = useForm<ICreateWodForm>({
        mode:"onChange",
    });

    const onSubmit = async() => {
        try {
            const { title, content } = getValues();
    
            // createAccountMutation({
            //     variables: {
            //         createAccountInput: {
            //             name,
            //             profileImg,
            //             email,
            //             password,
            //             role,
            //             myBox
            //         }
            //     }
            // })
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

    return(
        <_Container>
            <Helmet>
                <title>Create Wod | CrossfiTogether</title>
            </Helmet>
            <_WodImgContainer>
                <_WodImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_WodImg> 
                <_WodImgTitle>Create WOD</_WodImgTitle>
            </_WodImgContainer>
            <_SubContainer>
                <_CreateWodForm  onSubmit={handleSubmit(onSubmit)}>
                    <_CreateWodSpan>WOD Title</_CreateWodSpan>
                    <DatePicker
                        selected={startDate} 
                        onChange={(date:Date) => setStartDate(date)}
                    />
                    <_CreateWodInput 
                        {...register("title", {
                            required: "Title is required",
                        })}
                        name="title"
                        placeholder="Title"
                        className="input"
                    />
                    {errors.title?.message && (  
                        <FormError errorMessage={errors.title?.message} />
                    )}
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
                    {/* <Button canClick={formState.isValid} loading={loading} actionText={"CREATE ACCOUNT"} />
                    {createAccountMutationResult?.createAccount.error && <FormError errorMessage={createAccountMutationResult.createAccount.error}/>} */}
                </_CreateWodForm>
                <ModalBase visible={isOpen} onClose={handleModalClose} modalContentText={"Welcome To CrossfiTogether"} modalButtonText={"SIGN IN NOW"}> </ModalBase>
            </_SubContainer>
        </_Container>
    );
}