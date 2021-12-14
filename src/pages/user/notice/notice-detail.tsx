import { _NoticeDetailContainer, _NoticeDetailProfileName, _NoticeDetailProfileSpan, _NoticeDetailContent } from "@/theme/components/_Notice";
import { notice, noticeVariables } from "@/__generated__/notice";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

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
                    name
                }
            }
        }
    }
`;

interface IParams {
    id: string;
}

export const NoticeDetail = () => {
    const {id} = useParams<IParams>();
    const { data:notice } = useQuery<notice, noticeVariables>(
        NOTICE,
        {
            variables: {
                input: {
                    noticeId:+id,
                },
            },
        }
    );
console.log(notice);

    return (
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
                    <img src={notice?.notice.notice?.coverImg} alt="컨텐츠 이미지" />
                )}
                <_NoticeDetailContent>{notice?.notice.notice?.contents}</_NoticeDetailContent>
            </div>
        </_NoticeDetailContainer>
    )
}