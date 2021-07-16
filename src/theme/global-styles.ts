import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';


const GlobalStyle = createGlobalStyle`
${reset}
    html,
    body {
        background-color:black;
        margin:0;
        padding:0;
    }

    button {
        background: none;
        cursor: pointer;
        border: none;
        outline: none;
        transition: all 0.5s ease-in-out;
    }

    img {
        width: 100%;
        height: 100%;
    }

    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyle;