import { _CreateNoticeFileInput, _CreateNoticeFileLabel, _CreateNoticeForm, _CreateNoticeInput, _CreateNoticeSpan, _CreateNoticeSubContainer, _CreateNoticeTextArea, _NoticeImg, _NoticeImgContainer, _NoticeImgTitle } from "@/theme/components/_Notice"
import React, { useCallback, useRef, useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { createNotice, createNoticeVariables } from "@/__generated__/createNotice";
import { Button } from "@/components/button";
import ModalBase from "@/pages/modal-base";
import { FormError } from "@/components/form-error";
import imageCompression from 'browser-image-compression'; 

export const CREATE_NOTICE = gql`
    mutation createNotice($input:CreateNoticeInput!) {
        createNotice(input:$input) {
            ok
            error
        }
    }
`;

interface ICreateNoticeForm {
    title: string;
    contents: string;
    coverImg:string;
}

export const CreateNotice = () => {
    const history = useHistory();
    const [file, setFile] = useState<File|null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLTextAreaElement>(null);

    const onCompleted = (data:createNotice) => {
        const { createNotice: { ok }, } = data;
        if(ok) {
            handleModalOpen();
        }
    }
    const [createNotice, { loading, data:createNoticeResult }] = useMutation<createNotice, createNoticeVariables>(CREATE_NOTICE, {
        onCompleted,   
    });

    const { register, control, getValues, watch, formState: { errors }, handleSubmit, formState } = useForm<ICreateNoticeForm>({
        mode:"onChange",
    });

    const onSubmit = async() => {
        try {
            const { title, contents} = getValues();
            
            if(!file) {
                createNotice({
                    variables: {
                        input: {
                            title,
                            contents
                        }
                    }
                })
                return;
            }else {
                const actualFile = file;
                const formBody = new FormData();
                formBody.append("file", actualFile);
                let uri:string;
                process.env.NODE_ENV === "production"
                ? uri='https://crossfitogether0225.herokuapp.com/uploads'
                : uri='http://localhost:4000/uploads'
                const { url: coverImg } = await (
                    await fetch(uri, {
                        method:"POST",
                        body:formBody,
                    })
                ).json();
    
                createNotice({
                    variables: {
                        input: {
                            title,
                            contents,
                            coverImg
                        }
                    }
                })
            }
            
        } catch (e:any) {
            console.log(e.response.data);
        }
    }
    
    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
        history.push("/notices");
        location.reload();
    };

    const handleResizeHeight = useCallback(() => {
        if (ref === null || ref.current === null) {
            return;
        }
        ref.current.style.height = '100px';
        ref.current.style.height = ref.current.scrollHeight + 'px';
    }, []);

    const changeInput = async (e:any) => {
        let imgFile = e.target.files[0];	// ???????????? file??????
        const options = {
            maxSizeMB: 2, 
            maxWidthOrHeight: 500
        }
        try {
            const compressedFile = await imageCompression(imgFile, options);
            setFile(compressedFile);
        } catch(error) {
            console.log(error);
        }
    }

    return(
        <>
            <Helmet>
                <title>Create Notice | CrossfiTogether</title>
            </Helmet>
            <_NoticeImgContainer>
                <_NoticeImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_NoticeImg> 
                <_NoticeImgTitle>????????? ??????</_NoticeImgTitle>
            </_NoticeImgContainer>
            <_CreateNoticeSubContainer>
                <_CreateNoticeForm  onSubmit={handleSubmit(onSubmit)}>
                    <_CreateNoticeSpan>* ????????? ??????</_CreateNoticeSpan>
                    <_CreateNoticeInput  
                        {...register("title", {
                            required: "????????? ???????????????.",
                        })}
                        name="title"
                        type="text"
                        placeholder="??????"
                        className="input"
                    />
                    {errors.title?.message && (
                        <FormError errorMessage={errors.title?.message} />
                    )}
                    <_CreateNoticeSpan>????????? ?????????</_CreateNoticeSpan>
                    <_CreateNoticeFileInput
                            {...register("coverImg")}
                            type="file"
                            accept="image/*"
                            onChange={changeInput}
                            id="input-file"
                            style={{ display: 'none' }}
                    />
                    <_CreateNoticeFileLabel htmlFor="input-file"> ????????? ???????????? </_CreateNoticeFileLabel>
                    <img src={file? URL.createObjectURL(file) : undefined} id="preview"/>
                    {errors.coverImg?.message && ( <FormError errorMessage={errors.coverImg?.message} />
                    )}
                    <_CreateNoticeSpan>* ????????? ??????</_CreateNoticeSpan>
                    <_CreateNoticeTextArea 
                        {...register("contents", {
                            required: "????????? ???????????????.",
                        })}
                        name="contents"
                        placeholder="??????"
                        className="textarea"
                        ref={ref}
                        onInput={handleResizeHeight}
                    />
                    {errors.contents?.message && ( <FormError errorMessage={errors.contents?.message} />
                    )}
                    <Button canClick={formState.isValid} loading={loading} actionText={"?????? ??????"} />
                    {createNoticeResult?.createNotice.error && <FormError errorMessage={createNoticeResult.createNotice.error}/>}
                </_CreateNoticeForm>
                <ModalBase visible={isOpen} onClose={handleModalClose} modalContentText={"????????? ?????? ??????????????????"} modalButtonText={"??????"}> </ModalBase>
            </_CreateNoticeSubContainer>
        </>
    );
}