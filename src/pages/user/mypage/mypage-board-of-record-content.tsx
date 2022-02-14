import { _MyPageListBoxContent, _MyPageListBoxContentContainer, _MyPageListBoxContentLayout, _MypageModal, _MypageModalCloseButton, _MypageModalContent, _MyPageWodDateSpan } from "@/theme/components/_MyPage";
import { myBoardofRecords } from "@/__generated__/myBoardofRecords";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import ModalBase from "../../modal-base";
import styled, { css, keyframes } from 'styled-components';
import CommonModal from "@/components/modal";

export const MY_BOARD_OF_RECORDS = gql`
query myBoardofRecords($input:MyBoardofRecordInput!) {
    myBoardofRecords(input:$input) {
        ok
        error
        bors {
            id
            content
            owner {
                id
                name
            }
            wod {
                id
                title
                content
            }
        }
    }
}
`;

interface IMyPageBoardOfRecordContent {
    wodId:number;
}

interface IMyPageBorList {
    id:number;
    content:string;
    owner:IOwner;
    wod:IWod;
}

interface IOwner {
    id:number;
}

interface IWod {
    id:number;
    title:string;
    content:string;
}

export const MyPageBoardOfRecordContent:React.FC<IMyPageBoardOfRecordContent> = ({wodId}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [wodContent, setWodContent] = useState("");
    const [scrollY, setScrollY] = useState(0);
    const { data:myBoardofRecord, loading:myBoardofRecordLoading } = useQuery<myBoardofRecords>(MY_BOARD_OF_RECORDS, {
        variables: {
            input: {
                id:wodId
            }
        }
    });

    const handleModalOpen = (content:string) => {
        const body = document.querySelector("body");
        if(body) body.style.overflow = "hidden";
        setWodContent(content)
        setIsOpen(true);
    };

    const handleModalClose = () => {
        const body = document.querySelector("body");
        if(body) body.style.overflow = "auto";
        setIsOpen(false);
    };

    return(
        <>
            {myBoardofRecord?.myBoardofRecords.bors.length !== 0 
            &&(
                myBoardofRecord?.myBoardofRecords.bors.map((bor:IMyPageBorList) => (
                    bor.id !== undefined &&(
                        <div>
                            <_MyPageListBoxContentContainer onClick={()=>handleModalOpen(bor.wod.content)} key={bor.id} myPageContent={"mypage"}>
                                <_MyPageListBoxContentLayout key={bor.id}>
                                    <_MyPageWodDateSpan>{bor.wod.title}</_MyPageWodDateSpan>
                                    <_MyPageListBoxContent record={bor.id}>{bor.content}</_MyPageListBoxContent>
                                </_MyPageListBoxContentLayout>
                            </_MyPageListBoxContentContainer>
                            <CommonModal isOpen={isOpen} content={wodContent} handleModalClose={handleModalClose}></CommonModal>
                        </div>
                    )
                ))
            )}
        </>
    )
}