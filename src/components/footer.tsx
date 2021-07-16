import React from 'react';
import styled from "styled-components";

const FooterStyle = styled.div`
    text-align:center;
    font-size:12px;
    border-top:1px solid #d9d9d9;
    background-color:#f1f1f1;
    color:#888;
    padding:30px 0;
    margin:0;
`

const Footer = () => {
    return(
        <FooterStyle>
            ©2021 CrossfiTogether.
        </FooterStyle>
    );
}
export default Footer;