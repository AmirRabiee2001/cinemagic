import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root{
        &, &.light-mode {
            --color-primary: #E63946;
            --color-background: #FFFFFF;
            --color-background-2: rgba(255, 255, 255, 0.85);
            --color-background-3: #EAEAEA;
            --color-text: #1C1C1C;
            --color-text-2: #616161;
            --color-icon: #1C1C1C;
            --color-icon-active: #D1001C;
            --color-navbar: #F2F2F2;
            --color-header: #F7F7F7;
            --color-input-background: #E0E0E0;
            --color-input-text: #1C1C1C;
            --color-input-placeholder: #9E9E9E; 

            --backdrop-color: rgba(255, 255, 255, .7);

            --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
            --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.2);
            --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
        }
        &.dark-mode {
            --color-primary: #E63946;
            --color-background: #121212;
            --color-background-2: rgba(18, 18, 18, 0.85);
            --color-background-3: #ffffff1e;
            --color-text: #EAEAEA;
            --color-text-2: #B0B0B0;
            --color-icon: #EAEAEA;
            --color-icon-active: #D1001C;
            --color-navbar: #1C1C1E;
            --color-header: #1C1C1E;
            --color-input-background: #2C2C2E;
            --color-input-text: #FFFFFF;
            --color-input-placeholder: #757575; 
            
            --backdrop-color: rgba(0, 0, 0, 0.8);

            --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
            --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
            --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);
        }
    }
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    
        /* Creating animations for dark mode */
        transition: background-color 0.3s, border 0.3s;
    }
    html{
        font-size: 62.5%;
        direction: rtl;
        scrollbar-width: none;
    }
    body{
        font-family: "Vazirmatn", sans-serif;
        color: var(--color-text);
        position: relative;
        background-color: var(--color-background);
        transition: color 0.3s, background-color 0.3s;
        min-height: 100vh;
        line-height: 1.5;
        font-size: 1.6rem;
        
    }
    main{
        &::-webkit-scrollbar{
            display: none;
        }
    }
    input,
    button,
    textarea,
    select{
        font-family: inherit;
        color: inherit;
    }
    button{
        cursor: pointer;
    }  
    *:disabled{
        cursor: not-allowed;
    }
    input:focus,
    button:focus,
    textarea:focus,
    select:focus {
        outline: none;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    ul {
        list-style: none;
    }
    img {
        max-width: 100%;
    }
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        overflow-wrap: break-word;
        hyphens: auto;
    }
`;

export default GlobalStyles;
