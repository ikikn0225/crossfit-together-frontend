import { FormError } from "@/components/form-error";
import { AffiliatedBoxList, UserRole } from "@/__generated__/globalTypes";
import gql from "graphql-tag"
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { BigContainer, FormStyle, InputStyle, SmallContainer } from "../login";
import { SelectStyle, FileInputStyle } from "../create-account";
import { Button } from "@/components/button";
import { useMutation } from "@apollo/client";



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
    name: AffiliatedBoxList;
    address: string;
    coverImg: string;
}



export const CreateAffiliatedBox = () => {
    const {register, getValues, watch, formState: { errors }, handleSubmit, formState} = useForm<ICreateAffiliatedBoxForm>({
        mode:"onChange",
    });
    // const [createAffiliatedBoxMutation, { loading, data:createAffiliatedBoxMutationResult }] = useMutation<createAffiliatedBoxMutation, createAffiliatedBoxMutationVariables>(CREATE_AFFILIATED_BOX_MUTATION, {
    //     onCompleted,   
    // });
    return (
        <BigContainer>
            <Helmet>
                <title>Create Affiliated Box | CrossfiTogether</title>
            </Helmet>
            <SmallContainer>
                <FormStyle >
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
                        {...register("coverImg", {
                            required: "coverImg is required",
                        })}
                        type="file"
                        accept="image/*"
                    />
                    {/* <Button canClick={formState.isValid} loading={uploading} actionText={"Create My Box"} />
                    {createAccountMutationResult?.createAccount.error && <FormError errorMessage={createAccountMutationResult.createAccount.error}/>} */}
                </FormStyle>
            </SmallContainer>
        </BigContainer>
    )
}