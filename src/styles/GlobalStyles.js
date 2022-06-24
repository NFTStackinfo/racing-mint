import { createGlobalStyle, keyframes } from "styled-components"
import { fontFace } from "../utils/utils"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1
  }
`

export const GlobalStyle = createGlobalStyle`
  /*reset*/
  html, body, div, span, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  abbr, address, cite, code,
  del, dfn, em, img, ins, kbd, q, samp,
  small, strong, sub, sup, var,
  b, i,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section, summary,
  time, mark, audio, video, button {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
  }

  article, aside, details, figcaption, figure, dialog,
  footer, header, hgroup, menu, nav, section, main {
    display: block;
  }

  ul, ul li {
    list-style: none;
  }

  blockquote, q {
    quotes: none;

    &:before, &:after {
      content: none;
    }
  }

  a {
    text-decoration: none;
    font-size: 100%;
    color: inherit;
  }
  

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /**
   * Paul Irish box sizing reset so all elements have broder-box.
   */
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
    font-family: inherit;
  }

  /**
   * custom smarty resets
   */
  a {
    text-decoration: none;
  }

  button, input, a, textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input {
    &:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px #fff inset !important;
    }
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  ${({ theme }) =>
    fontFace("/fonts/D-DINCondensed-Bold", theme.fonts.primary, 700)};
  ${({ theme }) =>
    fontFace("/fonts/D-DINCondensed-Regular", theme.fonts.primary, 400)}

  /*global*/
  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.black};
    font-weight: 400;
    line-height: 1.4;
    position: relative;
    height: 100%;
  }

  
  /*typography*/

  h1, h2, h3, h4, .h1, .h2, .h3, .h4 {
    line-height: 1.2;
    text-transform: uppercase;
  }

  h1, .h1 {
    white-space: nowrap;
    font-size: ${({ theme }) => theme.titleSizes.h1};
    font-weight: 700;
    -webkit-text-stroke: 1px ${({ theme }) => theme.colors.black};
    filter: drop-shadow(0 0 7px ${({ theme }) => theme.colors.white});
  }

  h2, .h2 {
    font-size: ${({ theme }) => theme.titleSizes.h2};
    font-weight: 700;
    -webkit-text-stroke: 1px ${({ theme }) => theme.colors.black};
    filter: drop-shadow(0 0 7px ${({ theme }) => theme.colors.white});
  }

  h3, .h3 {
    font-size: ${({ theme }) => theme.titleSizes.h3};
    font-weight: 700;
    -webkit-text-stroke: 1px ${({ theme }) => theme.colors.black};
    filter: drop-shadow(0 0 7px ${({ theme }) => theme.colors.white});
  }

  h4, .h4 {
    font-size: ${({ theme }) => theme.titleSizes.h4};
  }


  /*colors*/
  .color-primary {
    color: ${({ theme }) => theme.colors.primary};
  }

  .fw-bold {
    font-weight: 700;
  }
  .fw-regular {
    font-weight: 400;
  }


  /*animations*/
  .animated {
    opacity: 0;
  }
  
  .transition {
    transition: transform .1s linear;
  }

  .fade-in {
    animation: ${fadeIn} .5s ease-in forwards;
  }


  iframe {
    pointer-events: none; /*for development*/
  }


  /*media queries*/
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {

    h1, .h1 {
      font-size: ${({ theme }) => theme.titleSizesSM.h1};
    }

    h2, .h2 {
      font-size: ${({ theme }) => theme.titleSizesSM.h2};
    }
    
  }

  /*media queries*/
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    
    body {
      font-size: ${({ theme }) => theme.fontSizesXS.lg};
    }

    h1, .h1 {
      font-size: ${({ theme }) => theme.titleSizesXS.h1};
    }
    h2, .h2 {
      font-size: ${({ theme }) => theme.titleSizesXS.h2};
    }
    h3, .h3 {
      font-size: ${({ theme }) => theme.titleSizesXS.h3};
    }
    h4, .h4 {
      font-size: ${({ theme }) => theme.titleSizesXS.h4};
    }
    h5, .h5 {
      font-size: ${({ theme }) => theme.titleSizesXS.h5};
    }
  }

  @media (max-height: ${({ theme }) => theme.breakpoints.sm}px) {
    body {
      font-size: ${({ theme }) => theme.fontSizesXS.lg};
    }

    h1, .h1 {
      font-size: ${({ theme }) => theme.titleSizesXS.h1};
    }
    
    h3, .h3 {
      font-size: ${({ theme }) => theme.titleSizesXS.h3};
    }
    h4, .h4 {
      font-size: ${({ theme }) => theme.titleSizesXS.h4};
    }
    h5, .h5 {
      font-size: ${({ theme }) => theme.titleSizesXS.h5};
    }
  }

  @media (max-height: 680px) {
    h2, .h2 {
      font-size: ${({ theme }) => theme.titleSizesXS.h2};
    }
  }

  @media (max-height: 840px) and (orientation: landscape)  {
    h1, .h1 {
      font-size: ${({ theme }) => theme.titleSizesSM.h1};
    }
  }

  @media (max-height: ${({ theme }) => theme.breakpoints.xs}px) {
    body {
      font-size: 14px;
    }
    h1, .h1 {
      font-size: 40px;
    }
    h3, .h3 {
      font-size: 24px;
    }
  }

  @media (hover: none), (pointer:coarse), (-moz-touch-enabled: 1) {
    .scroll-horizontal {
      overflow: scroll !important;
      overflow: overlay !important;
      overflow-x: scroll !important;
      overflow-x: overlay !important;
      overflow-y: hidden !important;
      -ms-overflow-style: none !important;
      scrollbar-width: none !important;

      &>div {
        transform: none !important;
        position: relative;
      }

      &::-webkit-scrollbar {
        display: none !important;
      }
    }
  }

`
