import { _WodCreateWodButton, _WodCreateWodButtonContainer, _WodImg, _WodImgContainer, _WodImgTitle, _WodListContainer, _WodNoContent, _WodListSubContainer, _WodListLayout, _WodListTitle, _WodListContent } from "./_Wod";
import styled from 'styled-components';
import { _CreateWodSubContainer, _CreateWodSpan, _CreateWodForm, _CreateWodTextArea } from "./_CreateWod";
import { _CreateAccountInput } from "./_CreateAccount";
import { _TimeTableFileLabel } from "./_TimeTable";
import { Link } from "react-router-dom";
import { _ButtonCommon } from "./_Button";


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
    overflow: hidden;
    padding-left:2rem;
    padding-right:2rem;
`;

export const _NoticeNoContent = styled(_WodNoContent)``;

export const _NoticeListLayout = styled.div`
    margin-top:3rem;
    border-bottom:1px solid #3d3d3d;
    margin-bottom:3rem;
    // padding-bottom:1rem;

    & > img:first-child {
        max-height: 100vh;
        max-width: 100%;
        width: auto;
        margin: 2rem auto;
        height: auto;
        object-fit: contain;
        display: block;
    }
`;

export const _NoticeListTitle = styled.div`
    padding-top: 1rem;
    padding-bottom:1rem;
    font-size:${(props) => props.theme.fontSizes.xl};
    font-weight:${(props) => props.theme.fontWeights.bold};

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletM} {
        font-weight:${(props) => props.theme.fontWeights.extraBold};
    }
`;

export const _NoticeListContent = styled.p`
    word-break: break-word;
    overflow-wrap: break-word;
    font-size: 0.875rem;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgb(149, 149, 149);
`;

export const _NoticeListFooter = styled.div`
    padding: 0.625rem 1rem;
    display: flex;
    font-size: 0.75rem;
    line-height: 1.5;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-top:1rem;
`;

export const _NoticeListProfile = styled.a`
    text-decoration: none;
    color: inherit;
    display: flex;
    -webkit-box-align: center;
    align-items: center;

    & > img {
        object-fit: cover;
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
        display: block;
        margin-right: 0.5rem;
    }
`;

export const _NoticeListProfileName = styled.span`
    object-fit: cover;
    border-radius: 50%;
    width: 100%;
    height: 1.5rem;
    display: block;
    margin-right: 0.5rem;
`;

export const _NoticeListLike = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
`;

export const _NoticeListLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    color:#fff;
`;

export const _NoticeDetailProfileName = styled.span`
    color: #fff;
    font-size: 1rem;
    &:focus {
        text-decoration: underline;
    }
`;

export const _NoticeDetailContainer = styled.div`
    width: 100%;
    margin-top:1rem;
    & > div {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    & > div > h1 {
        font-size: 3rem;
        line-height: 1.5;
        letter-spacing: -0.004em;
        margin-top: 0px;
        font-weight: 800;
        color: #fff;
        word-break: keep-all;
    }

    & > div:nth-child(2) {
        margin: 5rem auto 0px;
    }
`;

export const _NoticeDetailProfileSpan = styled.span`
    margin-left: 0.5rem;
    margin-right: 0.5rem;
`;

export const _NoticeDetailContent = styled(_NoticeListContent)`
    color:#fff;
    margin-top: 1rem;
`;

export const _NoticeUpdateLinkContainer = styled.div`
    text-align:right;
    margin-right:20px;
    padding:5px;

    div {
        margin-bottom:10px;
    }
`;

export const _NoticeUpdateLink = styled(Link)`
    padding:5px;
    background-color: rgb(7,93,198);
    // background-color: black;
    border-color:rgb(7,93,198);
    color:${({ theme }) => theme.mode.primaryText};
    font-size: 1.125rem;
    border-radius: 3px;
    font-weight: bold;
    outline: none;
    border: none;
    text-decoration:unset;

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        font-size: 1.3rem;
        height: 2.5rem;
        font-weight: 600;
        margin:30px;
    }
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletM} {
        font-size: 1.5rem;
        height: 2.75rem;
        font-weight: 700;
        margin:50px;
    }
`;

export const _NoticeDeleteButton = styled(_ButtonCommon)`
    background-color:#FF0000;
    // background-color: black;
    font-size: 1.125rem;
    font-weight: bold;
    cursor:pointer;
`;

export const _EditNoticeSubContainer = styled(_CreateNoticeSubContainer)``;

export const _EditNoticeForm = styled(_CreateNoticeForm)``;

export const _EditNoticeSpan = styled(_CreateNoticeSpan)``;

export const _EditNoticeInput = styled(_CreateNoticeInput)``;

export const _EditNoticeFileInput = styled(_CreateNoticeFileInput)``;

export const _EditNoticeFileLabel = styled(_CreateNoticeFileLabel)``;

export const _EditNoticeTextArea = styled(_CreateNoticeTextArea)``;