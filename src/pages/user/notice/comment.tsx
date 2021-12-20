import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { _CommentProfileInfoContainer, _CommentContainer, _CommentProfileInfo, _CommentProfileSubInfo, _CommentProfileName, _CommentDate, _CommentContentContainer, _CommentUpdateButtons, _NoticeCommentForm, _NoticeCommentButton, _NoticeCommentTextArea, _NoticeCommentFormContainer, _CommentButton } from "@/theme/components/_Notice"
import { deleteCommentInNotice, deleteCommentInNoticeVariables } from "@/__generated__/deleteCommentInNotice";
import { editCommentInNotice, editCommentInNoticeVariables } from "@/__generated__/editCommentInNotice";
import { gql, useApolloClient, useMutation } from "@apollo/client"
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { NOTICE_COMMENTS } from "./comments";
import { Replies } from "./replies";

const EDIT_COMMENT = gql`
    mutation editCommentInNotice($input:EditCommentInNoticeInput!) {
        editCommentInNotice(input:$input) {
            error
            ok
        }
    }
`;

const DELETE_COMMENT = gql`
    mutation deleteCommentInNotice($input:DeleteCommentInNoticeInput!) {
        deleteCommentInNotice(input:$input) {
            ok
            error
        }
    }
`;

interface ICommentProps {
    id:number;
    content:string;
    createdAt:Date;
    owner:IOwner;
    noticeId:number;
    meId:number;
}

interface IOwner {
    id:number;
    name:string;
    profileImg:string|null;
}

interface IEditCommentForm {
    commentId:number;
    content: string;
}

export const Comment:React.FC<ICommentProps> = ({id, content, createdAt, owner, noticeId, meId}) => {
    const client = useApolloClient();
    const contentDivRef = useRef<HTMLDivElement>(null);
    const [editCommentState, setEditCommentState] = useState("normal");

    const onCompleted = (data:editCommentInNotice) => {
        const { editCommentInNotice:{ok} } = data;
        if(ok) {
            const existingComments = client.readQuery({ query: NOTICE_COMMENTS, variables: { input: {noticeId}} });
            client.writeQuery({ 
                query: NOTICE_COMMENTS, variables: { input: {noticeId}},
                data: {
                    allCommentsInNotice: {
                        ...existingComments.allCommentsInNotice,
                        comments: [ editCommentInNotice, ...existingComments.allCommentsInNotice.comments
                        ],
                    },
                },
            });
        }
    }

    const [ editCommentInNotice, { loading, data:editCommentInNoticeResult } ] = useMutation<editCommentInNotice, editCommentInNoticeVariables>(EDIT_COMMENT, {
        onCompleted,
    });

    const [ deleteCommentInNotice, { loading:deleteLoading } ] = useMutation<deleteCommentInNotice, deleteCommentInNoticeVariables>(DELETE_COMMENT, {
        onCompleted({ deleteCommentInNotice }) {
            const existingComments = client.readQuery({ query: NOTICE_COMMENTS, variables: { input: {noticeId}} });
            client.writeQuery({ 
                query: NOTICE_COMMENTS, variables: { input: {noticeId}},
                data: {
                    allCommentsInNotice: {
                        ...existingComments.allCommentsInNotice,
                        comments: [deleteCommentInNotice, ...existingComments.allCommentsInNotice.comments
                        ],
                    },
                },
            });
        }
    })

    const deleteComment = async(id:number) => {
        if(deleteLoading === false) {
            deleteCommentInNotice({
                variables:{
                    input:{
                        id,
                    }
                }
            })
        }
    }

    const { register, control, getValues, watch, formState: { errors }, handleSubmit, formState } = useForm<IEditCommentForm>({
        mode:"onChange",
    });

    const showCommentTextArea = () => {
        setEditCommentState("edit")
    }

    const cancelEditComment = () => {
        setEditCommentState("normal");
    }

    const handleResizeHeight = useCallback(() => {
        if (contentDivRef === null || contentDivRef.current === null) {
            return;
        }
        contentDivRef.current.style.height = '100px';
        contentDivRef.current.style.height = contentDivRef.current.scrollHeight + 'px';
    }, []);

    const onSubmit = async() => {
        try {
            const { content } = getValues();
            
            editCommentInNotice({
                variables: {
                    input: {
                        commentId:id,
                        content
                    }
                }
            })
            
            setEditCommentState("normal");
        } catch (e:any) {
            console.log(e.response.data);
        }
    }

    return(
        <_CommentContainer>
            <_CommentProfileInfoContainer>
                <_CommentProfileInfo>
                    {owner.profileImg
                    ? (
                        <img src={owner.profileImg} />
                    )
                    :(
                        <img src="https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png" />
                    )}
                    <_CommentProfileSubInfo>
                        <_CommentProfileName>{owner.name}</_CommentProfileName>
                        <_CommentDate>{new Date(createdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }).substring(0, 13)}</_CommentDate>
                    </_CommentProfileSubInfo>
                </_CommentProfileInfo>
                {owner.id == meId
                &&(
                    <_CommentUpdateButtons>
                        <span onClick={showCommentTextArea}>수정</span>
                        <span onClick={()=>deleteComment(id)}>삭제</span>
                    </_CommentUpdateButtons>
                )}
            </_CommentProfileInfoContainer>
            {editCommentState == "normal"
            && (
                <_CommentContentContainer>
                    <p>{content}</p>
                </_CommentContentContainer>
            )}

            {editCommentState == "edit"
            && (
                <_NoticeCommentFormContainer>
                    <_NoticeCommentForm onSubmit={handleSubmit(onSubmit)}>
                        <_NoticeCommentTextArea
                            {...register("content")}
                            name="content"
                            placeholder="댓글을 작성해주세요"
                            className="textarea"
                            onInput={handleResizeHeight}
                            defaultValue={content}
                        />
                        {errors.content?.message && ( <FormError errorMessage={errors.content?.message} /> )}
                        <_CommentButton>
                            <button onClick={cancelEditComment}>취소</button>
                            <button>댓글 수정</button>
                        </_CommentButton>
                        {editCommentInNoticeResult?.editCommentInNotice.error && <FormError errorMessage={editCommentInNoticeResult.editCommentInNotice.error}/>}
                    </_NoticeCommentForm>
                </_NoticeCommentFormContainer>
            )}
            <Replies
                commentId={id}
                meId={meId}
            />
        </_CommentContainer>
    )
}