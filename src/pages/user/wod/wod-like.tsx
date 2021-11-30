import React, { useEffect, useState } from "react"
import { UserRole } from "@/__generated__/globalTypes"
import { _WodDeleteWodButton, _WodFontAwesomeIcon, _WodListContent, _WodListDay, _WodListLayout, _WodListLikeContainer, _WodListTitle, _WodUpdateWodLink, _WodUpdateWodLinkContainer } from "@/theme/components/_Wod"
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import { allLikesInWod } from "@/__generated__/allLikesInWod";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { createLikeInWod, createLikeInWodVariables } from "@/__generated__/createLikeInWod";
import { deleteLikeInWod, deleteLikeInWodVariables } from "@/__generated__/deleteLikeInWod";
import { ALL_LIKES_IN_WOD, CREATE_LIKE_MUTATION, DELETE_LIKE_MUTATION } from "@/pages/user/wod/wod";

interface IWodProps {
    wodId:number;
    userId:number;
}

interface IOwner {
    id:number;
}
interface ILike {
    owner:IOwner;
}

export const WodListLike: React.FC<IWodProps> = ({wodId, userId}) => {
    const client = useApolloClient();
    const { data:likes } = useQuery<allLikesInWod>(ALL_LIKES_IN_WOD, {
        variables: {
            input: {
                wodId,
            }
        }
    });
    const [ likeState, setLikeState ] = useState(false);
    const [ likeCountState, setLikeCountState ] = useState<number | undefined>(0);

    const [createLikeMutation] = useMutation<createLikeInWod, createLikeInWodVariables>(CREATE_LIKE_MUTATION, {
        onCompleted({ createLikeInWod }) {
            const existingLikes = client.readQuery({ query: ALL_LIKES_IN_WOD, variables: { input: {wodId}} });
            
            client.writeQuery({ 
                query: ALL_LIKES_IN_WOD, variables: { input: {wodId}},
                data: {
                    allLikesInWod: {
                        ...existingLikes.allLikesInWod,
                        likes: [createLikeInWod, ...existingLikes.allLikesInWod.likes
                        ],
                    },
                },
            });
        }
    });
    const [deleteLikeMutation] = useMutation<deleteLikeInWod, deleteLikeInWodVariables>(DELETE_LIKE_MUTATION, {
        onCompleted({ deleteLikeInWod }) {
            const existingLikes = client.readQuery({ query: ALL_LIKES_IN_WOD, variables: { input: {wodId}} });
            client.writeQuery({ 
                query: ALL_LIKES_IN_WOD, variables: { input: {wodId}},
                data: {
                    allLikesInWod: {
                        ...existingLikes.allLikesInWod,
                        likes: [deleteLikeInWod, ...existingLikes.allLikesInWod.likes
                        ],
                    },
                },
            });
        }
    });

    useEffect(() => {
        const likeIndex = likes?.allLikesInWod.likes?.findIndex((e:ILike) => e.owner.id === userId);
        if(likeIndex !== -1) setLikeState(true);
        else setLikeState(false);
        setLikeCountState(likes?.allLikesInWod.likes?.length);
    }, [likes])

    const onClickLike = (wodId:number, count:number | undefined) => {
        createLikeMutation({
            variables:{
                input:{
                    wodId:wodId
                }
            }
        });
    }

    const onClickUnlike = (wodId:number, count:number | undefined) => {
        deleteLikeMutation({
            variables:{
                input:{
                    wodId:wodId
                }
            }
        });
    }

    return (
            <_WodListLikeContainer>
                {likeState
                ? (
                    <_WodFontAwesomeIcon icon={faHeartSolid} onClick={()=>onClickUnlike(wodId, likeCountState)} />
                )
                : (
                    <_WodFontAwesomeIcon icon={faHeart} onClick={()=>onClickLike(wodId, likeCountState)} />
                )}
                {likeCountState !== 0
                ? (
                    <span>{likeCountState}</span>
                )
                : (
                    <span>0</span>
                )}
            </_WodListLikeContainer>
    )
}