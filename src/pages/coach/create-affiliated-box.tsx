import { FormError } from "@/components/form-error";
import { UserRole } from "@/__generated__/globalTypes";
import gql from "graphql-tag"
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { BigContainer, FormStyle, InputStyle, SmallContainer } from "../login";
import { SelectStyle, FileInputStyle } from "../create-account";
import { Button } from "@/components/button";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { CreateAffiliatedBoxMutation, CreateAffiliatedBoxMutationVariables } from "@/__generated__/CreateAffiliatedBoxMutation";



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
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const history = useHistory();
    const onCompleted = (data: CreateAffiliatedBoxMutation) => {
        const { createAffiliatedBox: { ok, error } } = data;
        if(ok) {
            setUploading(false);
            alert("Welcome to CrossfiTogether!");
            history.push("/main");
        }
    }
    const [createAffiliatedBoxMutation, { loading, data:createAffiliatedBoxMutationResult }] = useMutation<CreateAffiliatedBoxMutation, CreateAffiliatedBoxMutationVariables>(CREATE_AFFILIATED_BOX_MUTATION, {
        onCompleted,   
    });

    const onSubmit = async() => {
        try {
            const { name, address, file } = getValues();
            
            const actualFile = file[0];
            const formBody = new FormData();
            formBody.append("file", actualFile);
            const { url: coverImg } = await (
                await fetch("http://localhost:4000/uploads/", {
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
        } catch (e) {
            console.log(e.response.data);
        }
    }
    return (
        <BigContainer>
            <Helmet>
                <title>Create Affiliated Box | CrossfiTogether</title>
            </Helmet>
            <SmallContainer>
                <FormStyle onSubmit={handleSubmit(onSubmit)}>
                    <InputStyle
                        {...register("name", {
                            required: "Name is required",
                        })}
                        name="name"
                        type="name"
                        placeholder="Name"
                        className="input"
                    />
                    {errors.name?.message && (  
                        <FormError errorMessage={errors.name?.message} />
                    )}
                    <InputStyle  
                        {...register("address", {
                            required: "Address is required",
                        })}
                        name="address"
                        type="address"
                        placeholder="Address"
                        className="input"
                    />
                    {errors.address?.message && (
                        <FormError errorMessage={errors.address?.message} />
                    )}
                    <FileInputStyle 
                        {...register("file", {
                            required: "Cover Image is required",
                        })}
                        type="file"
                        accept="image/*"
                    />
                    <Button canClick={formState.isValid} loading={uploading} actionText={"Create My Box"} />
                    {createAffiliatedBoxMutationResult?.createAffiliatedBox.error && <FormError errorMessage={createAffiliatedBoxMutationResult.createAffiliatedBox.error}/>}
                </FormStyle>
            </SmallContainer>
        </BigContainer>
    )
}