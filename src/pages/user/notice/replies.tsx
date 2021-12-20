import { FormError } from "@/components/form-error"
import { _CommentButton, _RepliesButton, _RepliesContainer, _RepliesFontAwesomeIcon, _RepliesForm, _RepliesListContainer, _RepliesTextArea, _RepliesToggleButton, _RepliesToggleContainer } from "@/theme/components/_Notice";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client"
import { 
    faPlus as faPlusSolid, 
    faMinus as faMinusSolid, 
} from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare, faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/button";
import { repliesInNotice } from "@/__generated__/repliesInNotice";
import { createReplyInNotice, createReplyInNoticeVariables } from "@/__generated__/createReplyInNotice";
import { useForm } from "react-hook-form";
import { Reply } from "./reply";

export const REPLIES = gql`
    query repliesInNotice($input:AllRepliesInNoticeInput!) {
        repliesInNotice(input:$input) {
            error
            ok
            replies {
            id
            content
            createdAt
                owner {
                    id
                    name
                    profileImg
                }
            }
        }
    }
`;

export const CREATE_REPLY = gql`
    mutation createReplyInNotice($input:CreateReplyInNoticeInput!) {
        createReplyInNotice(input:$input) {
            error
            ok
        }
    }
`;

interface IRepliesProps {
    commentId:number;
    meId:number;
}

interface IReply {
    id:number;
    content:string;
    createdAt:Date;
    owner:IOwner;
}

interface IOwner {
    id:number;
    name:string;
    profileImg:string|null;
}

interface INoticeReplyForm {
    content: string;
}

export const Replies:React.FC<IRepliesProps> = ({commentId, meId}) => {
    const client = useApolloClient();
    const ref = useRef<HTMLTextAreaElement>(null);
    const [tabToggleState, setTabToggleState] = useState("close");
    const { data:replies } = useQuery<repliesInNotice>(REPLIES, {
        variables:{
            input:{
                commentId
            }
        }
    });
console.log(replies);

    const handleTabListToggle = (toggle:string) => {
        if(toggle == "open")        setTabToggleState("close");
        else if(toggle == "close")  setTabToggleState("open");
    }   

    const onCompleted = (data:createReplyInNotice) => {
        const { createReplyInNotice: { ok }, } = data;
        if(ok) {
            const { content } = getValues();
            const existingNotices = client.readQuery({ query: REPLIES, variables: { input: {commentId}}});
            client.writeQuery({
                query: REPLIES, variables: { input: {commentId}},
                data: {
                    repliesInNotice: {
                        ...existingNotices.repliesInNotice,
                        replies: [
                            { 
                                id:commentId,
                                content,
                                __typename: 'AllRepliesInNoticeOutput'
                            },
                            ...existingNotices.repliesInNotice.replies,
                        ],
                    },
                },
            });
        }
    }

    const [createReplyInNotice, { loading, data:createReplyInNoticeResult }] = useMutation<createReplyInNotice, createReplyInNoticeVariables>(CREATE_REPLY, {
        onCompleted,   
    });

    const { register, control, getValues, watch, formState: { errors }, handleSubmit, formState } = useForm<INoticeReplyForm>({
        mode:"onChange",
    });


    const handleResizeHeight = useCallback(() => {
        if (ref === null || ref.current === null) {
            return;
        }
        ref.current.style.height = '100px';
        ref.current.style.height = ref.current.scrollHeight + 'px';
    }, []);

    const cancelEditComment = () => {
        setTabToggleState("close");
    }

    const onSubmit = async() => {
        try {
            const { content } = getValues();
            
            createReplyInNotice({
                variables: {
                    input: {
                        content,
                        commentId
                    }
                }
            })
            if (ref === null || ref.current === null) {
                return;
            }
            ref.current.value = '';
            
        } catch (e:any) {
            console.log(e.response.data);
        }
    }


    return(
        <_RepliesContainer>
            <_RepliesToggleContainer>
                {tabToggleState == "close" 
                    ? (
                        <_RepliesToggleButton onClick={()=>handleTabListToggle(tabToggleState)} >
                            <_RepliesFontAwesomeIcon icon={faPlusSolid}/>
                            <span>답글 달기</span>
                        </_RepliesToggleButton>
                    ) 
                    : (
                        <_RepliesToggleButton onClick={()=>handleTabListToggle(tabToggleState)} >
                            <_RepliesFontAwesomeIcon icon={faMinusSolid}/>
                            <span>숨기기</span>
                        </_RepliesToggleButton>
                    )
                }
            </_RepliesToggleContainer>
            {/* 여기에 reply 리스트 */}
                {tabToggleState == "open" 
                && (
                    <_RepliesListContainer>
                        {replies?.repliesInNotice.replies?.length !== 0
                        &&(
                            replies?.repliesInNotice.replies?.map((reply:IReply) => (
                                <Reply
                                    key={reply.id}
                                    id={reply.id}
                                    content={reply.content}
                                    createdAt={reply.createdAt}
                                    owner={reply.owner}
                                    commentId={commentId}
                                    meId={meId}
                                />
                            ))
                        )}
                        <_RepliesForm onSubmit={handleSubmit(onSubmit)}>
                            <_RepliesTextArea
                                {...register("content", {
                                    required: "빈 답글입니다",
                                })}
                                name="content"
                                placeholder="답글을 작성해주세요"
                                className="textarea"
                                ref={ref}
                                onInput={handleResizeHeight}
                            />
                            {errors.content?.message && ( <FormError errorMessage={errors.content?.message} /> )}
                            <_CommentButton>
                                <button onClick={cancelEditComment}>취소</button>
                                <button>댓글 작성</button>
                            </_CommentButton>
                            {createReplyInNoticeResult?.createReplyInNotice.error && <FormError errorMessage={createReplyInNoticeResult.createReplyInNotice.error}/>}
                        </_RepliesForm>
                    </_RepliesListContainer>
                )}
        </_RepliesContainer>
    )
}