import { useMe } from "@/hooks/useMe";
import ModalBase from "@/pages/modal-base";
import { _NoticeDetailContainer, _NoticeDetailProfileName, _NoticeDetailProfileSpan, _NoticeDetailContent, _NoticeUpdateLinkContainer, _NoticeUpdateLink, _NoticeDeleteButton, _NoticeDetailProfileImgContainer, _NoticeDetailProfileImg } from "@/theme/components/_Notice";
import { deleteNotice, deleteNoticeVariables } from "@/__generated__/deleteNotice";
import { UserRole } from "@/__generated__/globalTypes";
import { notice, noticeVariables } from "@/__generated__/notice";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router-dom";
import { Comments } from "./comments";

export const NOTICE = gql`
    query notice($input:OneNoticeInput!) {
        notice(input:$input) {
            ok
            error
            notice {
                id
                title
                contents
                coverImg
                createdAt
                comments {
                    id
                    content
                    createdAt
                }
                owner {
                    id
                    name
                    profileImg
                    role
                }
            }
        }
    }
`;

export const DELETE_NOTICE = gql`
    mutation deleteNotice($input:DeleteNoticeInput!) {
        deleteNotice(input:$input) {
            ok
            error
        }
    }
`;

interface IParams {
    id: string;
}

export const NoticeDetail = () => {
    const { data:me, loading, error } = useMe();
    const {id} = useParams<IParams>();
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [topHeight, setTopHeight] = useState<string>("");

    const { data:notice } = useQuery<notice, noticeVariables>( NOTICE, {
            variables: {
                input: {
                    noticeId:+id,
                },
            },
        }
    );
    
    const onCompleted = (data:deleteNotice) => {
        const { deleteNotice:{ok, error} } = data;
        if(ok) {
            handleModalOpen();
        }
    }


    const [ deleteNotice, { loading:deleteLoading } ] = useMutation<deleteNotice, deleteNoticeVariables>(DELETE_NOTICE, {
        onCompleted,
    })

    const handleModalOpen = () => {
        setIsOpen(true);
        setTopHeight(document.documentElement.scrollTop+200+"px");
    };

    const handleModalClose = () => {
        setIsOpen(false);
        history.push("/notices");
        location.reload();
    };

    const onClickNoticeDelete = async(id:number) => {
        if(deleteLoading === false) {
            deleteNotice({
                variables:{
                    input:{
                        noticeId:id
                    }
                }
            })
        }
    }
    
    return (
        <>
            <Helmet>
                <title>Notice | CrossfiTogether</title>
            </Helmet>
            {(notice?.notice.notice?.owner.role == UserRole.Coach || notice?.notice.notice?.owner.id == me?.me.id)
            && (
                <_NoticeUpdateLinkContainer>
                    <div>
                        <_NoticeUpdateLink to={`/edit-notice/${id}`}>????????? ??????</_NoticeUpdateLink>
                    </div>
                    <div>
                        <_NoticeDeleteButton onClick={() => onClickNoticeDelete(+id)}>????????? ??????</_NoticeDeleteButton>
                    </div>
                </_NoticeUpdateLinkContainer>
            )}
                            
            <_NoticeDetailContainer>
                <div>
                    <h1>{notice?.notice.notice?.title}</h1>
                    <div>
                        <_NoticeDetailProfileName>{notice?.notice.notice?.owner.name}</_NoticeDetailProfileName>
                        <_NoticeDetailProfileSpan>.</_NoticeDetailProfileSpan>
                        <span>{new Date(notice?.notice.notice?.createdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }).substring(0, 13)}</span>
                    </div>
                </div>
                <div>
                    {notice?.notice.notice?.coverImg && (
                        <img src={notice?.notice.notice?.coverImg} alt="????????? ?????????" />
                    )}
                    <_NoticeDetailContent>{notice?.notice.notice?.contents}</_NoticeDetailContent>
                </div>
                <div>
                    <_NoticeDetailProfileImgContainer>
                        <_NoticeDetailProfileImg img={notice?.notice.notice?.owner.profileImg}></_NoticeDetailProfileImg>
                    </_NoticeDetailProfileImgContainer>
                    <div>
                        <_NoticeDetailProfileName>{notice?.notice.notice?.owner.name}</_NoticeDetailProfileName>
                    </div>
                </div>
                <div>
                    {me?.me.id 
                    &&(
                        <Comments
                            noticeId={+id}
                            meId={me?.me.id}
                        />
                    )}
                </div>
            </_NoticeDetailContainer>
            <ModalBase visible={isOpen} onClose={handleModalClose} modalContentText={"???????????? ??????????????????!"} modalButtonText={"Close"} top={topHeight}> </ModalBase>
        </>
    )
}