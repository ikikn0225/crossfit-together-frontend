import { _BoardFontAwesomeIcon, _BoardInputButton, _BoardListBoxContent, _BoardListBoxContentContainer, _BoardListInput, _BoardListInputForm } from "@/theme/components/_BoardOfRecords"
import { faCheckSquare as faCheckSquareSolid, faWindowClose as faWindowCloseSolid, faCheck as faCheckSolid, faTimes as faTimesSolid, faPencilAlt as faPencelAltSolid } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare, faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { useRef } from "react";

interface IBorEditContentProps {
    borId:number;
    userId:number;
    borOwnerId:number;
    content:string;
}

export const BoardListBoxEditContent:React.FC<IBorEditContentProps> = ({borId, userId, borOwnerId, content}) => {
    const editDivRef = useRef<HTMLDivElement>(null);
    const checkBtnRef = useRef<HTMLButtonElement>(null);
    const editBtnRef = useRef<HTMLButtonElement>(null);

    const handleEditInputCancel = () => {
        
    }

    const handleEditInput = (content:string) => {
        if(editDivRef.current && checkBtnRef.current && editBtnRef.current) {
            checkBtnRef.current.style.display = 'block';
            editBtnRef.current.style.display = 'none';
            editDivRef.current.children[3].remove();
            const newElement = document.createElement('input');
            newElement.value = content;
            editDivRef.current.appendChild(newElement);
            
        }
        
    }

    return (
        <_BoardListBoxContentContainer key={borId} ref={editDivRef}>
            <_BoardInputButton type="button" onClick={handleEditInputCancel} userId={userId} borOwnerId={borOwnerId}>
                <_BoardFontAwesomeIcon icon={faTimesSolid}/>
            </_BoardInputButton>
            <_BoardInputButton type="button" onClick={() => handleEditInput(content)} ref={editBtnRef} userId={userId} borOwnerId={borOwnerId}>
                <_BoardFontAwesomeIcon icon={faPencelAltSolid}/>
            </_BoardInputButton>
            <_BoardInputButton userId={userId} borOwnerId={borOwnerId} editCheck={true} ref={checkBtnRef}>
                <_BoardFontAwesomeIcon icon={faCheckSolid}/>
            </_BoardInputButton>

            <_BoardListBoxContent>{content}</_BoardListBoxContent>

            {/* <_BoardListInputForm onSubmit={handleSubmit(onSubmit)}>
                <_BoardListInput 
                    {...register("content", {
                        required: "Content is required",
                    })}
                    name="content"
                    placeholder="Name(Record)"
                    ref={focusRef}
                />
                <_BoardInputButton type="button" onClick={handleNewInputCancel}>
                    <_BoardFontAwesomeIcon icon={faTimesSolid}/>
                </_BoardInputButton>
                <_BoardInputButton>
                    <_BoardFontAwesomeIcon icon={faCheckSolid}/>
                </_BoardInputButton>
            </_BoardListInputForm> */}
        </_BoardListBoxContentContainer>
    )
}