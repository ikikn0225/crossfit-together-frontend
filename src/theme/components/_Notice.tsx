import { _WodCreateWodButton, _WodCreateWodButtonContainer, _WodImg, _WodImgContainer, _WodImgTitle, _WodListContainer, _WodNoContent, _WodListSubContainer, _WodListLayout, _WodListTitle, _WodListContent } from "./_Wod";
import styled from 'styled-components';
import { _CreateWodSubContainer, _CreateWodSpan, _CreateWodForm, _CreateWodTextArea } from "./_CreateWod";
import { _CreateAccountInput } from "./_CreateAccount";
import { _TimeTableFileLabel } from "./_TimeTable";


export const _NoticeImgContainer = styled(_WodImgContainer)``;

export const _NoticeImg = styled(_WodImg)``;

export const _NoticeImgTitle = styled(_WodImgTitle)``;

export const _NoticeCreateNoticeButtonContainer = styled(_WodCreateWodButtonContainer)``;

export const _NoticeCreateNoticeButton = styled(_WodCreateWodButton)``;

export const _CreateNoticeSubContainer = styled(_CreateWodSubContainer)``;

export const _CreateNoticeForm = styled(_CreateWodForm)`
    & > div {
        text-align:center;
    }
`;

export const _CreateNoticeSpan = styled(_CreateWodSpan)``;

export const _CreateNoticeInput = styled(_CreateAccountInput)``;

export const _CreateNoticeTextArea = styled(_CreateWodTextArea)``;

export const _CreateNoticeFileInput = styled(_CreateAccountInput)``;

export const _CreateNoticeFileLabel = styled(_TimeTableFileLabel)`
    display:block;
    text-align: center;
    background-color:rgb(7,93,198);
    border:1px solid rgb(7,93,198);
`;

export const _NoticeListContainer = styled(_WodListContainer)``;

export const _NoticeListSubContainer = styled.div`
    width:auto;
    text-align:center;
    overflow: hidden;
`;

export const _NoticeNoContent = styled(_WodNoContent)``;

export const _NoticeListLayout = styled.div`
    margin-top:2rem;
    border-bottom:1px solid #3d3d3d;
    margin-bottom:4rem;
    padding-bottom:4rem;
`;

export const _NoticeListTitle = styled(_WodListTitle)``;

export const _NoticeListContent = styled(_WodListContent)``;
