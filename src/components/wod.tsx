import React, { useEffect, useState } from "react"
import { UserRole } from "@/__generated__/globalTypes"
import { _WodDeleteWodButton, _WodFontAwesomeIcon, _WodListContent, _WodListDay, _WodListLayout, _WodListLikeContainer, _WodListTitle, _WodUpdateWodLink, _WodUpdateWodLinkContainer } from "@/theme/components/_Wod"
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import { allLikesInWod } from "@/__generated__/allLikesInWod";
import { useMutation, useQuery } from "@apollo/client";
import { createLikeInWod, createLikeInWodVariables } from "@/__generated__/createLikeInWod";
import { deleteLikeInWod, deleteLikeInWodVariables } from "@/__generated__/deleteLikeInWod";

const ALL_LIKES_IN_WOD = gql`
    query allLikesInWod($input:AllLikesInWodInput!) {
        allLikesInWod(input:$input) {
            ok
            error
            likes {
                owner {
                    id
                }
            }
        }
    }
`;

const CREATE_LIKE_MUTATION = gql`
    mutation createLikeInWod($input:CreateLikeInWodInput!) {
        createLikeInWod(input:$input) {
            error
            ok
        }
    }
`;

const DELETE_LIKE_MUTATION = gql`
    mutation deleteLikeInWod($input:DeleteLikeInWodInput!) {
        deleteLikeInWod(input:$input) {
            error
            ok
        }
    }
`;

interface IWodProps {
    id:number;
    role:string;
    title:string;
    titleDate:Date;
    content:string;
    userId:number;
    borPage?:boolean;
}

interface IOwner {
    id:number;
}
interface ILike {
    owner:IOwner;
}

const dayOfWeekAsString = (dayIndex:number) => {
    return ["SUNDAY", "MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"][dayIndex] || '';
};

export const Wod: React.FC<IWodProps> = ({id, role, title, titleDate, content, userId, borPage}) => {
    const { data:likes } = useQuery<allLikesInWod>(ALL_LIKES_IN_WOD, {
        variables: {
            input: {
                wodId:id,
            }
        }
    });
    const [ likeState, setLikeState ] = useState(false);
    const [ likeCountState, setLikeCountState ] = useState<number | undefined>(0);

    const [createLikeMutation] = useMutation<createLikeInWod, createLikeInWodVariables>(CREATE_LIKE_MUTATION);
    const [deleteLikeMutation] = useMutation<deleteLikeInWod, deleteLikeInWodVariables>(DELETE_LIKE_MUTATION);

    useEffect(() => {
        const likeIndex = likes?.allLikesInWod.likes?.findIndex((e:ILike) => e.owner.id === userId);
        if(likeIndex !== -1) setLikeState(true);
        else setLikeState(false);
        setLikeCountState(likes?.allLikesInWod.likes?.length);
    }, [likes])

    const handleLike = (likeState:boolean, wodId:number, count:number | undefined) => {
        if(likeState) {
            deleteLikeMutation({
                variables:{
                    input:{
                        wodId:wodId
                    }
                }
            });
            setLikeState(false);
            if(count)
                setLikeCountState(count-1);
        } else if(!likeState) {
            createLikeMutation({
                variables:{
                    input:{
                        wodId:wodId
                    }
                }
            });
            setLikeState(true);
            if(count !== undefined)
                setLikeCountState(count+1);
        }
    }

    return (
        <_WodListLayout key={title+1} borPage={borPage}>
            <_WodListDay>{dayOfWeekAsString(new Date(titleDate).getDay())}</_WodListDay>
            <_WodListTitle key={title+2}>{title}</_WodListTitle>
            <_WodListContent key={title+3}>{content}</_WodListContent>
            <_WodListLikeContainer>
                {likeState 
                ? (
                    <_WodFontAwesomeIcon icon={faHeartSolid} onClick={()=>handleLike(likeState, id, likeCountState)} />
                )
                : (
                    <_WodFontAwesomeIcon icon={faHeart} onClick={()=>handleLike(likeState, id, likeCountState)} />
                )}
                {likeCountState !== 0
                ? (
                    <span>{likeCountState}</span>
                )
                : (
                    <span>0</span>
                )}
            </_WodListLikeContainer>
        </_WodListLayout>
    )
}