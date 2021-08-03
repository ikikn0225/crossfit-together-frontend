import { ButtonCommonStyle } from "@/components/button";
import { useMe } from "@/hooks/useMe";
import { LoadingSpanStyle, LoadingStyle } from "@/router/logged-in-router";
import { UserRole } from "@/__generated__/globalTypes";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BigContainer, FormStyle, InputStyle, SmallContainer } from "./login";

const SmallContainerExtend = styled(SmallContainer)`
    width:auto;
    padding:0;
`;

const _No_Affiliated_Box = styled.div`
    text-align:center;
`;

const _CreateAffiliatedBoxButton = styled(ButtonCommonStyle)`
    color:#000;
    margin:2rem;
`;


export const NoBox = () => {
    const { data, loading, error } = useMe();
    const history = useHistory();
    const gotoCreateAffiliatedBox = () => {
        history.push("/create-affiliated-box");
    }
    if (!data || loading || error) {
        return (
            <LoadingStyle>
                <LoadingSpanStyle>Loading...</LoadingSpanStyle>
            </LoadingStyle>
        );
    }
    if(data.me.role === UserRole.Crossfiter) {
        return (
            <SmallContainerExtend>
                <Helmet>
                    <title>No Affiliated Box | CrossfiTogether</title>
                </Helmet>
                <_No_Affiliated_Box>
                    <span>There is no Affiliated Box yet.</span>    
                </_No_Affiliated_Box>
            </SmallContainerExtend>
        );
    }
    if(data.me.role === UserRole.Coach) {
        return (
            <SmallContainerExtend>
                <Helmet>
                    <title>No Affiliated Box | CrossfiTogether</title>
                </Helmet>
                <_No_Affiliated_Box>
                    <span>There is no Affiliated Box yet.</span>    
                </_No_Affiliated_Box>
                <_CreateAffiliatedBoxButton onClick={gotoCreateAffiliatedBox}>Create Affiliated Box</_CreateAffiliatedBoxButton>
            </SmallContainerExtend>
            // <>
            // <Helmet>
            //     <title>Create Affiliated Box | CrossfiTogether</title>
            // </Helmet>
            // <SmallContainer>
            //     {themeMode === "light" 
            //         ? <img src="../../public/images/logo_white_fake.jpg" />
            //         : <img src="../../public/images/logo_black_fake.jpg" />
            //     }
            //     <FormStyle  onSubmit={handleSubmit(onSubmit)}>
            //         <InputStyle 
            //             {...register("name", {
            //                 required: "Name is required",
            //             })}
            //             name="name"
            //             type="name"
            //             placeholder="Name"
            //             className="input"
            //         />
            //         {errors.name?.message && (  
            //             <FormError errorMessage={errors.name?.message} />
            //         )}
            //         <InputStyle  
            //             {...register("address", {
            //                 required: "Address is required",
            //             })}
            //             name="address"
            //             type="address"
            //             placeholder="Address"
            //             className="input"
            //         />
            //         {errors.address?.message && (
            //             <FormError errorMessage={errors.address?.message} />
            //         )}
            //         <Button canClick={formState.isValid} loading={loading} actionText={"Log in"}></Button>
            //         {loginMutationResult?.login.error &&<FormError errorMessage={loginMutationResult.login.error} />}
            //     </FormStyle>
            //     <GuideToExtra>
            //         <div>
            //             New to CrossfiTogether? <LinkCreateAccount to="/create-account" >Create Account</LinkCreateAccount>
            //         </div>
            //     </GuideToExtra>
            // </SmallContainer>
            // </>
        );
    }

    return (
        <BigContainer>
            <Helmet>
                <title>Main | CrossfiTogether</title>
            </Helmet>
        </BigContainer>
    );

}