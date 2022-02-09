import { _CommonModal, _CommonModalCloseButton, _CommonModalCloseButtonDiv, _CommonModalContent } from '@/theme/components/_CommonModal';
import React, { useState } from 'react';

interface IModal {
    isOpen:boolean;
    wodContent:string;
    handleModalClose:()=>void;
}

const CommonModal:React.FC<IModal> = ({isOpen, wodContent, handleModalClose}) => {
    
    return (
        <>
        <_CommonModal isOpen={isOpen}>
            <_CommonModalContent> 
                <_CommonModalCloseButtonDiv>
                    <button onClick={handleModalClose}> 확인 </button>
                </_CommonModalCloseButtonDiv>
                {wodContent}
            </_CommonModalContent>
        </_CommonModal>
        </>
    )
}

export default CommonModal