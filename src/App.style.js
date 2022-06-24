import styled from "styled-components";
export const AppStyle = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  text-align: center;
  
  header {
    padding-top: 52px;
    position: relative;
    
    &:before {
      content: '';
      height: 20px;
      position: absolute;
      top: 16px;
      left: 0;
      width: 100%;
      background: ${({theme}) => theme.colors.primaryGradient}
    }
  }

  .running-text-wrapper {
    border-top: 6px solid ${({ theme }) => theme.colors.white};
    border-bottom: 6px solid ${({ theme }) => theme.colors.white};
  }
  
  section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .content  {
      max-width: 720px;
      
      padding: 40px 16px;
    }
  }
  
  footer {
    height: 160px;
    background: url('assets/race.jpg') repeat-x center;
    position: relative;
    
    &:after, &:before {
      content: '';
      height: 19px;
      width: 100%;
      background: linear-gradient(270deg, #BB8A4F 19.74%, #E9B471 44.23%, #E9B471 68.98%, #E8C66C 100%);
      position: absolute;
      left: 0;
      
    }

    &:before {
      top: 0;
    }

    &:after {
      bottom: 0;
    }
  }
  
  button {
    margin-top: 44px;
  }
  
  .title {
    margin-bottom: 24px;
  }

  .text {
    font-size: 24px;
    margin-bottom: 16px;
  }
  .yellow-text {
    color: ${({theme}) => theme.colors.primary};
    font-weight: 700;
  }
  
  .mint-content {
    display: flex;
    justify-content: center;
    margin-top: 32px;
  }
  
  .mint-input {
    border: 1px solid ${({theme}) => theme.colors.white};
    margin-right: 24px;
    line-height: 60px;
    width: 130px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    
    .icon {
      cursor: pointer;
      
      &.disabled {
        opacity: 0.4;
        cursor: default;
        pointer-events: none;
      }
    }
  }
  .mt-24 {
    margin-top: 24px;
  }
  
  .warn-text {
    font-size: ${({theme}) => theme.fontSizes.md};
    padding-top: 16px;
  }

  

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    header {
      //padding-top: 24px;

    }
  }


  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {

    
  }
`
