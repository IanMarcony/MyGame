import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root{
    --background-color: #454D6B;
    --background-secondary-color: #353B50;
    --background-high-color:#A7AABD;
    --text-color: #D6D7DC;
    --text-secondary-color: #FFF8EC;
    --button-color: #A13854;
  }

  *{
    margin:0;
    padding:0;
    outline:0;
    box-sizing:border-box;
  }

  body{
    background:var(--background-color);
    color:var(--text-color);
    -webkit-font-smoothing:antialiased;
    font-family: 'Roboto', serif;

  }

  body,input, button{
    font-weight: 400;
    font-size: 16px ;

  }

  h1,h2,h3,h4,h5,h6,strong{

    font-weight:500;

  }

  button,a {

    cursor:pointer;

  }

  button{
    border-width: 0;
    background-color: var(--button-color) ;
    color: var(--text-secondary-color);
  }


`;
