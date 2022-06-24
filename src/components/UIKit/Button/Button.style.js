import styled, {css, keyframes} from "styled-components"


const ldsRing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const ButtonStyle = styled.a`
  padding: 0 16px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.white};
  transition: 0.5s;
  cursor: pointer;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;

  .icon {
    margin-right: 12px;

    path {
      transition: 0.5s;
    }
  }

  ${({variant}) =>
          variant === "primary" &&
          css`
            height: 60px;
            font-size: ${({theme}) => theme.fontSizes.lg};
            background-color: ${({theme}) => theme.colors.white};
            color: ${({theme}) => theme.colors.black};
            border: 1px solid ${({theme}) => theme.colors.white};


            &:hover {
              background-color: transparent;
              color: ${({theme}) => theme.colors.white};

              .icon {
                path {
                  fill: ${({theme}) => theme.colors.black} !important;
                }
              }
            }
          `}
  ${({variant}) =>
          variant === "outlined" &&

          css`
            height: 40px;
            background-color: transparent;
            border: 1px solid ${({theme}) => theme.colors.white};
            font-size: ${({theme}) => theme.fontSizes.sm};

            &:hover {
              background-color: ${({theme}) => theme.colors.white};
              color: ${({theme}) => theme.colors.black};

              .icon {
                path {
                  fill: ${({theme}) => theme.colors.black} !important;
                }
              }
            }
          `
  }
  ${({isLoading}) =>
          isLoading && css`
            pointer-events: none;
            &:hover {
              background-color: ${({theme}) => theme.colors.white};
              color: ${({theme}) => theme.colors.black};
            }
          `
  }
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    margin-left: 24px;
  }

  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    border: 3px solid ${({theme}) => theme.colors.black};
    border-radius: 50%;
    animation: ${ldsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({theme}) => theme.colors.black} transparent transparent transparent;
  }

  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }

  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }

  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }


  &.fade-in-button {
    opacity: 1;
    visibility: visible;
  }
`
