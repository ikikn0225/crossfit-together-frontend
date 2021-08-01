import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';


const GlobalStyle = createGlobalStyle`
${reset}
    html,
    body {
        margin:0;
        padding:0;
        min-width:300px;
        height:100%;
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