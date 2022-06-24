import styled, { css, keyframes } from "styled-components"

const animateRunText = keyframes`

  from {
    background-position-x: 0
  }
  to {
    background-position-x: 10000px
  }
`

export const RunningTextStyle = styled.div`
  background: url("${({ image }) => image}-lg.png") repeat-x center;
  background-position-y: center;
  width: 100%;
  height: 96px;
  animation: ${animateRunText} 50s infinite linear;
  will-change: transform;
  position: relative;
  top: 0;
  left: 0;
  z-index: 9;
  background-color: ${({ theme }) => theme.colors.black};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    background: url("${({ image }) => image}-md.png") repeat-x center;
    height: 80px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    background: url("${({ image }) => image}-sm.png") repeat-x center;
    height: 72px;
  }

  ${({ withFlag }) =>
    withFlag &&
    css`
      .flag {
        position: absolute;
        top: 0;
        right: -34px;
        bottom: 0;
        height: 100%;
      }
    `}

  ${({ withBorder }) =>
    withBorder &&
    css`
      border-right: 10px solid ${({ theme }) => theme.colors.white};
    `}
`
