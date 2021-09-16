import { Wod } from "@/components/wod";
import { useMe } from "@/hooks/useMe";
import { _Loading, _LoadingSpan } from "@/theme/components/_Loading";
import { 
    _WodListContainer, 
    _WodListSubContainer, 
    _WodListTitle, 
    _WodCreateWodButton, 
    _WodCreateWodButtonContainer, 
    _WodImg, 
    _WodImgContainer, 
    _WodImgTitle, 
    _WodNoContent, 
    _WodListContent, 
    _WodListLayout,
    _WodUpdateWodLink,
    _WodUpdateWodLinkContainer,
    _WodDeleteWodButton,
    _WodListDay,
    _WodCategoryContainer,
    _WodCategoryLink,
    _WodFontAwesomeIcon
} from "@/theme/components/_Wod"
import { allWods } from "@/__generated__/allWods";
import { deleteWod, deleteWodVariables } from "@/__generated__/deleteWod";
import { UserRole } from "@/__generated__/globalTypes";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async"
import { Link, useHistory } from "react-router-dom";
import ModalBase from "../modal-base";
import { useParams } from "react-router"
import { CategoryList } from "./category-list";

export const ALL_WODS = gql`
    query allWods($input:AllWodsInput!) {
        allWods(input:$input) {
            ok
            error
            wods {
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

export const DELETE_WOD = gql`
    mutation deleteWod($deleteWodInput:DeleteWodInput!) {
        deleteWod(input:$deleteWodInput) {
            ok
            error
        }
    }
`;

interface IWodList {
    id:number;
    title:string;
    content:string;
    titleDate:Date;
}

interface ICategoryParams {
    slug: string;
}

export const Wods = () => {
    const { data, loading, error } = useMe();
    const history = useHistory();
    const params = useParams<ICategoryParams>();
    const [isOpen, setIsOpen] = useState(false);
    const [topHeight, setTopHeight] = useState<string>("");

    const onCompleted = (data:deleteWod) => {
        const { deleteWod:{ok, error} } = data;
        if(ok) {
            // handleModalTop();
            handleModalOpen();
        }
    }

    const { data:wods } = useQuery<allWods>(ALL_WODS, {
        variables: {
            input: {
                slug: params.slug,
            }
        }
    });
    const [ deleteWod, { loading:deleteLoading } ] = useMutation<deleteWod, deleteWodVariables>(DELETE_WOD, {
        onCompleted,
    })

    const gotoCreateWod = () => {
        history.push("/create-wod");
    }

    const onClickDelete = async(id:number) => {
        if(deleteLoading === false) {
            deleteWod({
                variables:{
                    deleteWodInput:{
                        wodId:id,
                    }
                }
            })
        }
    }
    
    const handleModalOpen = () => {
        setIsOpen(true);
        setTopHeight(document.documentElement.scrollTop+200+"px");
    };

    const handleModalClose = () => {
        setIsOpen(false);
        location.reload();
    };

    if (!data || loading || error) {
        return (
            <_Loading>
                <_LoadingSpan>Loading...</_LoadingSpan>
            </_Loading>
        );
    }

    return(
        <>
            <Helmet>
                <title>WOD | CrossfiTogether</title>
            </Helmet>
            <_WodImgContainer>
                <_WodImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_WodImg> 
                <_WodImgTitle>WOD</_WodImgTitle>
            </_WodImgContainer>
            {data.me.role == UserRole.Coach && (
                <_WodCreateWodButtonContainer>
                    <_WodCreateWodButton onClick={gotoCreateWod}>Create Wod</_WodCreateWodButton>
                </_WodCreateWodButtonContainer>
            )}
            <_WodListContainer>
                <_WodListSubContainer>
                    <CategoryList />
                    {wods?.allWods.wods?.length !== 0 
                    ? (
                        wods?.allWods.wods?.map((wod:IWodList) => (
                            <Wod 
                                key={wod.title}
                                role={data.me.role}
                                id={wod.id}
                                title={wod.title}
                                titleDate={wod.titleDate}
                                content={wod.content}
                                onClickDelete={onClickDelete}
                            />
                        ))
                    )
                    : (
                        <_WodNoContent>Sorry, No Rep!</_WodNoContent>
                    )}
                </_WodListSubContainer>
            </_WodListContainer>
            <ModalBase visible={isOpen} onClose={handleModalClose} modalContentText={"DELETE COMPLETED!"} modalButtonText={"Close"} top={topHeight}> </ModalBase>
        </>
    )
}