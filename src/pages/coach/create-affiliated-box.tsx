import { FormError } from "@/components/form-error";
import gql from "graphql-tag"
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { CreateAffiliatedBoxMutation, CreateAffiliatedBoxMutationVariables } from "@/__generated__/CreateAffiliatedBoxMutation";
import { _Container, _SubContainer } from "../../theme/components/_Layout"
import { _CreateAffiliatedBoxForm ,_CreateAffiliatedBoxInput ,_CreateAffiliatedBoxFileInput, _CreateAffiliatedBoxFileLabel } from "../../theme/components/_CreateAffiliatedBox";
import ModalBase from "../modal-base";
import imageCompression from 'browser-image-compression';

export const CREATE_AFFILIATED_BOX_MUTATION = gql`
    mutation CreateAffiliatedBoxMutation($createAffiliatedBoxInput:CreateAffiliatedBoxInput!) {
        createAffiliatedBox(input:$createAffiliatedBoxInput) {
            ok
            error
            affiliatedBoxId
        }
    }
`;

interface ICreateAffiliatedBoxForm {
    name: string;
    address: string;
    coverImg: string;
    file: FileList;
}



export const CreateAffiliatedBox = () => {
    const {register, getValues, watch, formState: { errors }, handleSubmit, formState} = useForm<ICreateAffiliatedBoxForm>({
        mode:"onChange",
    });
    const [file, setFile] = useState<File|null>(null);
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    
    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
        history.push("/");
        location.reload();
    };

    const onCompleted = (data: CreateAffiliatedBoxMutation) => {
        const { createAffiliatedBox: { ok, error } } = data;
        if(ok) {
            setUploading(false);
            handleModalOpen();
        }
    }
    const [createAffiliatedBoxMutation, { loading, data:createAffiliatedBoxMutationResult }] = useMutation<CreateAffiliatedBoxMutation, CreateAffiliatedBoxMutationVariables>(CREATE_AFFILIATED_BOX_MUTATION, {
        onCompleted,   
    });

    const changeInput = async(e:any) => {
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

    const onSubmit = async() => {
        try {
            const { name, address } = getValues();
            if(file) {
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
                
                setImageUrl(coverImg);
                
                createAffiliatedBoxMutation({
                    variables: {
                        createAffiliatedBoxInput: {
                            name,
                            address,
                            coverImg
                        }
                    }
                })
            }
        } catch (e:any) {
            console.log(e.response.data);
        }
    }
    return (
        <_Container>
            <Helmet>
                <title>Create Affiliated Box | CrossfiTogether</title>
            </Helmet>
            <_SubContainer>
                <_CreateAffiliatedBoxForm onSubmit={handleSubmit(onSubmit)}>
                    <_CreateAffiliatedBoxInput
                        {...register("name", {
                            required: "????????? ???????????????",
                        })}
                        name="name"
                        type="name"
                        placeholder="??????"
                        className="input"
                    />
                    {errors.name?.message && (  
                        <FormError errorMessage={errors.name?.message} />
                    )}
                    <_CreateAffiliatedBoxInput  
                        {...register("address", {
                            required: "????????? ???????????????",
                        })}
                        name="address"
                        type="address"
                        placeholder="??????"
                        className="input"
                    />
                    {errors.address?.message && (
                        <FormError errorMessage={errors.address?.message} />
                    )}
                    <_CreateAffiliatedBoxFileInput 
                        {...register("file", {
                            required: "?????? ?????? ???????????? ??????????????????",
                        })}
                        type="file"
                        accept="image/*"
                        onChange={changeInput}
                        id="input-file"
                    />
                    <_CreateAffiliatedBoxFileLabel htmlFor="input-file"> ?????? ?????? ?????? ???????????? </_CreateAffiliatedBoxFileLabel>
                    <img src={file? URL.createObjectURL(file) : undefined} id="preview"/>
                    {errors.file?.message && (
                        <FormError errorMessage={errors.file?.message} />
                    )}
                    <Button canClick={formState.isValid} loading={loading} actionText={"?????? ????????????"} />
                    {createAffiliatedBoxMutationResult?.createAffiliatedBox.error && <FormError errorMessage={createAffiliatedBoxMutationResult.createAffiliatedBox.error}/>}
                </_CreateAffiliatedBoxForm>
                <ModalBase visible={isOpen} onClose={handleModalClose} modalContentText={"?????? ????????? ??????????????????!"} modalButtonText={"??? ????????? ????????????"}> </ModalBase>
            </_SubContainer>
        </_Container>
    )
}