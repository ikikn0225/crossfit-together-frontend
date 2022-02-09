import { _CommonModal, _CommonModalCloseButton, _CommonModalContent } from '@/theme/components/_CommonModal';
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
                <_CommonModalCloseButton onClick={handleModalClose}> 확인 </_CommonModalCloseButton>
                {wodContent}
            </_CommonModalContent>
        </_CommonModal>
        </>
    )
}

export default CommonModal