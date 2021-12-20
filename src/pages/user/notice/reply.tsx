import { _ReplyButton, _ReplyContainer, _ReplyContentContainer, _ReplyDate, _ReplyForm, _ReplyFormContainer, _ReplyProfileInfo, _ReplyProfileInfoContainer, _ReplyProfileName, _ReplyProfileSubInfo, _ReplyTextArea, _ReplyUpdateButtons } from "@/theme/components/_Notice"
import { useCallback, useRef, useState } from "react";
import { gql, useApolloClient, useMutation } from "@apollo/client"
import { deleteReplyInNotice, deleteReplyInNoticeVariables } from "@/__generated__/deleteReplyInNotice";
import { REPLIES } from "./replies";
import { FormError } from "@/components/form-error";
import { useForm } from "react-hook-form";
import { editReplyInNotice, editReplyInNoticeVariables } from "@/__generated__/editReplyInNotice";

const EDIT_REPLY = gql`
    mutation editReplyInNotice($input:EditReplyInNoticeInput!) {
        editReplyInNotice(input:$input) {
            error
            ok
        }
    }
`;

const DELETE_REPLY = gql`
    mutation deleteReplyInNotice($input:DeleteReplyInNoticeInput!) {
        deleteReplyInNotice(input:$input) {
            ok
            error
        }
    }
`;

interface IReplyProps {
    id:number;
    content:string;
    createdAt:Date;
    owner:IOwner;
    commentId:number;
    meId:number;
}

interface IOwner {
    id:number;
    name:string;
    profileImg:string|null;
}

interface IEditReplyForm {
    replyId:number;
    content: string;
}

export const Reply:React.FC<IReplyProps> = ({id, content, createdAt, owner, commentId, meId}) => {
    const client = useApolloClient();
    const [editReplyState, setEditReplyState] = useState("normal");
    const contentDivRef = useRef<HTMLDivElement>(null);

    const onCompleted = (data:editReplyInNotice) => {
        const { editReplyInNotice:{ok} } = data;
        if(ok) {
            const existingReplies = client.readQuery({ query: REPLIES, variables: { input: {commentId}} });
            client.writeQuery({ 
                query: REPLIES, variables: { input: {commentId}},
                data: {
                    repliesInNotice: {
                        ...existingReplies.repliesInNotice,
                        replies: [ editReplyInNotice, ...existingReplies.repliesInNotice.replies
                        ],
                    },
                },
            });
        }
    }

    const [ editReplyInNotice, { loading, data:editReplyInNoticeResult } ] = useMutation<editReplyInNotice, editReplyInNoticeVariables>(EDIT_REPLY, {
        onCompleted,
    });
    
    const { register, control, getValues, watch, formState: { errors }, handleSubmit, formState } = useForm<IEditReplyForm>({
        mode:"onChange",
    });

    const [ deleteReplyInNotice, { loading:deleteLoading } ] = useMutation<deleteReplyInNotice, deleteReplyInNoticeVariables>(DELETE_REPLY, {
        onCompleted({ deleteReplyInNotice }) {
            const existingReplys = client.readQuery({ query: REPLIES, variables: { input: {commentId}} });
            client.writeQuery({ 
                query: REPLIES, variables: { input: {commentId}},
                data: {
                    repliesInNotice: {
                        ...existingReplys.repliesInNotice,
                        replies: [deleteReplyInNotice, ...existingReplys.repliesInNotice.replies
                        ],
                    },
                },
            });
        }
    })

    const deleteReply = async(id:number) => {
        if(deleteLoading === false) {
            deleteReplyInNotice({
                variables:{
                    input:{
                        id,
                    }
                }
            })
        }
    }

    const showReplyTextArea = () => {
        setEditReplyState("edit");
    }
    const cancelEditReply = () => {
        setEditReplyState("normal");
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
            
            editReplyInNotice({
                variables: {
                    input: {
                        replyId:id,
                        content
                    }
                }
            })
            
            setEditReplyState("normal");
        } catch (e:any) {
            console.log(e.response.data);
        }
    }

    return(
        <_ReplyContainer>
            <_ReplyProfileInfoContainer>
                <_ReplyProfileInfo>
                    {owner.profileImg
                    ? (
                        <img src={owner.profileImg} />
                    )
                    :(
                        <img src="https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png" />
                    )}
                    <_ReplyProfileSubInfo>
                        <_ReplyProfileName>{owner.name}</_ReplyProfileName>
                        <_ReplyDate>{new Date(createdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }).substring(0, 13)}</_ReplyDate>
                    </_ReplyProfileSubInfo>
                </_ReplyProfileInfo>
                {owner.id == meId
                &&(
                    <_ReplyUpdateButtons>
                        <span onClick={showReplyTextArea}>수정</span>
                        <span onClick={()=>deleteReply(id)}>삭제</span>
                    </_ReplyUpdateButtons>
                )}
            </_ReplyProfileInfoContainer>
            {editReplyState == "normal"
            && (
                <_ReplyContentContainer ref={contentDivRef}>
                    <p>{content}</p>
                </_ReplyContentContainer>
            )}
            {editReplyState == "edit"
            && (
                <_ReplyFormContainer>
                    <_ReplyForm onSubmit={handleSubmit(onSubmit)}>
                        <_ReplyTextArea
                            {...register("content")}
                            name="content"
                            placeholder="댓글을 작성해주세요"
                            className="textarea"
                            onInput={handleResizeHeight}
                            defaultValue={content}
                        />
                        {errors.content?.message && ( <FormError errorMessage={errors.content?.message} /> )}
                        <_ReplyButton>
                            <button onClick={cancelEditReply}>취소</button>
                            <button>댓글 수정</button>
                        </_ReplyButton>
                        {editReplyInNoticeResult?.editReplyInNotice.error && <FormError errorMessage={editReplyInNoticeResult.editReplyInNotice.error}/>}
                    </_ReplyForm>
                </_ReplyFormContainer>
            )}
        </_ReplyContainer>
    )
}