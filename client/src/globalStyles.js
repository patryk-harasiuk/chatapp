import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Montserrat", sans-serif;
        list-style: none;
    }

    .content-wrapper {
        display: flex;
    }

    .modal {
        z-index: 999;
        opacity: 0.85;
        pointer-events: none;
    }
`;

export default GlobalStyle;
