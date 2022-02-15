import { _WodCreateWodButton, _WodCreateWodButtonContainer, _WodImg, _WodImgContainer, _WodImgTitle, _WodListContainer, _WodNoContent, _WodListSubContainer, _WodListLayout, _WodListTitle, _WodListContent } from "./_Wod";
import styled from 'styled-components';
import { _CreateWodSubContainer, _CreateWodSpan, _CreateWodForm, _CreateWodTextArea } from "./_CreateWod";
import { _CreateAccountInput } from "./_CreateAccount";
import { _TimeTableFileLabel } from "./_TimeTable";
import { Link } from "react-router-dom";
import { _ButtonCommon } from "./_Button";
import { _MyPageProfileImg, _MyPageProfileImgContainer } from "./_MyPage";
import { _ToggleButton } from "./_LeaderBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
    padding-left:1rem;
    padding-right:1rem;
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
    font-weight:bold;
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
        margin: 5rem auto 5rem;
    }

    & > div:nth-child(3) {
        margin:2rem 1rem;
        padding:1rem;
    }

    & > div:nth-child(4) {
        border-top:1px solid rgb(95, 95, 95);
        margin: 2rem 1rem;
        padding:3rem 1rem;
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

export const _NoticeDetailProfileImg = styled(_MyPageProfileImg)``;

export const _NoticeDetailProfileImgContainer = styled(_MyPageProfileImgContainer)`
    // margin-top:2rem;
    // margin-bottom:2rem;
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

export const _NoticeCommentH4 = styled.h4`
    padding-top:2rem;
    padding-bottom:2rem;
`;

export const _NoticeCommentForm = styled.form``;

export const _NoticeCommentTextArea = styled.textarea`
    resize: none;
    padding: 1rem 1rem 1.5rem;
    outline: none;
    border: 1px solid rgb(233, 236, 239);
    margin-bottom: 1.5rem;
    width: 100%;
    min-height: 6.125rem;
    font-size: 1rem;
    color: rgb(33, 37, 41);
    line-height: 1.75;
    height:70px;
`;

export const _NoticeCommentButton = styled.div`
    display: flex;
    -webkit-box-pack: end;
    justify-content: flex-end;
`;

export const _NoticeCommentsContainer = styled.div`
    margin: 3rem 1rem;

    & > div {
        border-top:1px solid rgb(95, 95, 95);
    }

    & > div:first-child {
        border-top:0;
    }
`;

export const _CommentContainer = styled.div`
    padding-bottom: 1.5rem;
    padding-top: 1.5rem;
`;

export const _CommentProfileInfoContainer = styled.div`
    margin-bottom: 1.5rem;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
`;

export const _CommentProfileInfo = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;

    & > img {
        width: 2.5rem;
        height: 2.5rem;
        display: block;
        border-radius: 50%;
        object-fit: cover;
    }
`;

export const _CommentProfileSubInfo = styled.div`
    margin-left:0.5rem;
`;

export const _CommentProfileName=styled.div`
    font-size: 0.875rem;
    font-weight: bold;
    color: #fff;
`;

export const _CommentDate = styled.div`
    font-size: 0.75rem;
    margin-top: 0.5rem;
    color: rgb(175, 175, 175);
`;

export const _CommentContentContainer = styled.div`
    color: #fff;
    line-height: 1.7;
    letter-spacing: -0.004em;
    word-break: keep-all;
    overflow-wrap: break-word;
    font-size: 1rem;
`;

export const _CommentUpdateButtons = styled.div`
    font-size: 0.75rem;
    color: rgb(175, 175, 175);
    cursor:pointer;

    & > span:nth-of-type(2) {
        margin-left: 0.5rem;
    }
`;

export const _NoticeCommentFormContainer = styled.div`
    display:none;
`;

export const _CommentButton = styled.div`
    display: flex;
    -webkit-box-pack: end;
    justify-content: flex-end;

    & > button {
        display: inline-flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        font-weight: bold;
        cursor: pointer;
        outline: none;
        border: none;
        color: white;
        border-radius: 4px;
        padding: 0px 1.25rem;
        height: 2rem;
        font-size: 1rem;
    }

    & > button:nth-of-type(1) {
        background: rgb(134, 142, 150);
    }
    
    & > button:nth-of-type(2) {
        background: rgb(7,93,198);
        margin-left:0.5rem;
    }
`;


export const _RepliesContainer = styled.div`
    margin-top:2rem;
`;

export const _RepliesToggleContainer = styled.div`
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(18, 184, 134);
    font-weight: bold;
    cursor: pointer;
`;

export const _RepliesToggleButton = styled(_ToggleButton)``;

export const _RepliesFontAwesomeIcon = styled(FontAwesomeIcon)`
    margin-right:0.5rem;
`;

export const _RepliesForm = styled(_NoticeCommentForm)`
`;

export const _RepliesTextArea = styled(_NoticeCommentTextArea)``;

export const _RepliesButton = styled(_NoticeCommentButton)``;

export const _RepliesListContainer = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.02);
    background-color: rgba(255, 255, 255, 0.2);
    padding: 1.5rem;
    border-radius: 4px;
    margin-top: 1.3125rem;
`;

export const _ReplyContainer = styled(_CommentContainer)``;

export const _ReplyProfileInfoContainer = styled(_CommentProfileInfoContainer)``;

export const _ReplyProfileInfo = styled(_CommentProfileInfo)``;

export const _ReplyProfileSubInfo = styled(_CommentProfileSubInfo)``;

export const _ReplyProfileName = styled(_CommentProfileName)``;

export const _ReplyDate = styled(_CommentDate)``;

export const _ReplyUpdateButtons = styled(_CommentUpdateButtons)``;

export const _ReplyContentContainer = styled(_CommentContentContainer)``;

export const _ReplyFormContainer = styled.div``;
export const _ReplyForm = styled(_NoticeCommentForm)``;
export const _ReplyTextArea = styled(_NoticeCommentTextArea)``;
export const _ReplyButton = styled(_CommentButton)``;