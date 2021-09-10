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
    _WodDeleteWodButton
} from "@/theme/components/_Wod"
import { allWods } from "@/__generated__/allWods";
import { deleteWod, deleteWodVariables } from "@/__generated__/deleteWod";
import { UserRole } from "@/__generated__/globalTypes";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async"
import { Link, useHistory } from "react-router-dom";
import ModalBase from "../modal-base";

export const ALL_WODS = gql`
    query allWods {
        allWods {
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
}

export const Wod = () => {
    const { data, loading, error } = useMe();
    const history = useHistory();
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [topHeight, setTopHeight] = useState<string>("");

    const onCompleted = (data:deleteWod) => {
        const { deleteWod:{ok, error} } = data;
        if(ok) {
            // handleModalTop();
            handleModalOpen();
        }
    }

    const { data:wods } = useQuery<allWods>(ALL_WODS);
    const [ deleteWod, { loading:deleteLoading } ] = useMutation<deleteWod, deleteWodVariables>(DELETE_WOD, {
        onCompleted,
    })

    const gotoCreateWod = () => {
        history.push("/create-wod");
    }

    const onClickDelete = async(id:number) => {
        try {
            deleteWod({
                variables:{
                    deleteWodInput:{
                        wodId:id,
                    }
                }
            })
        } catch (e:any) {
            console.log(e.response.data);
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
                    {wods?.allWods.wods?.length !== 0 
                    ? (
                        wods?.allWods.wods?.map((wod:IWodList) => (
                            <_WodListLayout key={wod.title+1}>
                                {data.me.role == UserRole.Coach && (
                                    <_WodUpdateWodLinkContainer>
                                        <div>
                                            <_WodUpdateWodLink to={`/edit-wod/${wod.id}`}>Edit Wod</_WodUpdateWodLink>
                                        </div>
                                        <div>
                                            <_WodDeleteWodButton onClick={() => onClickDelete(wod.id)}>Delete Wod</_WodDeleteWodButton>
                                        </div>
                                    </_WodUpdateWodLinkContainer>
                                )}
                                <_WodListTitle key={wod.title+2}>{wod.title}</_WodListTitle>
                                <_WodListContent key={wod.title+3}>{wod.content}</_WodListContent>
                            </_WodListLayout>
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