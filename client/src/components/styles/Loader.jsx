import styled, { keyframes } from 'styled-components'

const spinAnimation = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `

export const Loader = styled.div`
margin: 0 auto;
border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #383636;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 1.5s linear infinite; /* Safari */
  animation: ${spinAnimation} 1.5s infinite
`

