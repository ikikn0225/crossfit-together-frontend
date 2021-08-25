import { useMe } from "@/hooks/useMe";
import { _ConfirmEmailContainer, _ConfirmEmailSpan } from "@/theme/components/_ConfirmEmail";
import { verifyEmail, verifyEmailVariables } from "@/__generated__/verifyEmail";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router";

const VERIFY_EMAIL_MUTATION = gql`
    mutation verifyEmail($input: VerifyEmailInput!) {
        verifyEmail(input: $input) {
        ok
        error
        }
    }
`;

export const ConfirmEmail = () => {
    const { data: userData } = useMe();
    const client = useApolloClient();
    const history = useHistory();
    
    const onCompleted = (data: verifyEmail) => {
        
    const { verifyEmail: { ok } } = data;
        if (ok && userData?.me.id) {
            client.writeFragment({
                id: `User:${userData.me.id}`,
                fragment: gql`
                fragment VerifiedUser on User {
                    verified
                }
                `,
                data: {
                verified: true,
                },
            });
            history.push("/");
        }
    };
    const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
        VERIFY_EMAIL_MUTATION,
        {
            onCompleted,
        }
    );
  useEffect(() => { // 어떤 effect를 발생시키고 싶을때 사용한다. 렌더링 이후에 어떤 일을 수행해야하는지 말한다. 
    const [_, code] = window.location.href.split("code=");
    verifyEmail({
        variables: {
            input: {
            code,
            },
        },
        });
    }, [verifyEmail]);
    return (
        <_ConfirmEmailContainer>
            <Helmet>
                <title>Confirm Email | CrossfiTogether</title>
            </Helmet>
            <_ConfirmEmailSpan>Confirming email...</_ConfirmEmailSpan>
            <_ConfirmEmailSpan>Please wait, don't close this page...</_ConfirmEmailSpan>
        </_ConfirmEmailContainer>
    );
};