import { _HeaderBurger } from '@/theme/components/_Header';
import React, { useState } from 'react';
import HeaderRightNav from './menu-contents';

const HeaderBurger = () => {
    const [open, setOpen] = useState(false)
    
    return (
        <>
        <_HeaderBurger open={open} onClick={() => setOpen(!open)}>
            <div />
            <div />
            <div />
        </_HeaderBurger>
        <HeaderRightNav open={open}/>
        </>
    )
}

export default HeaderBurger