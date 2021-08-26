import { _ModalBackground, _ModalCloseButton, _ModalContent, _ModalSection } from '@/theme/components/_Modal';
import { ReactNode, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

export type ModalBaseProps = {
    /** 모달에 들어갈 컴포넌트 */
    children?: ReactNode;
    /** 모달 창 생성 여부를 컨트롤할 변수 */
    visible: boolean;
    /** 닫기 버튼 혹은 백그라운드 클릭 시 실행할 함수 */
    onClose: () => void;
    modalContentText:string;
    modalButtonText:string;
};

const ModalBase = ({ children, visible, onClose, modalContentText, modalButtonText }: ModalBaseProps) => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (visible) {
        setIsOpen(true);
        } else {
        timeoutId = setTimeout(() => setIsOpen(false), 150);
        }

        return () => {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
        }
        };
    }, [visible]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <_ModalBackground visible={visible} onClick={onClose} />
            <_ModalSection visible={visible}>
                <_ModalContent>{modalContentText}</_ModalContent>
                <_ModalCloseButton type="button" onClick={onClose}> {modalButtonText} </_ModalCloseButton>
            </_ModalSection>
        </>
    );
};

export default ModalBase;