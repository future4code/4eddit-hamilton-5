import styled from "styled-components"
import Button from "@material-ui/core/Button";

export const MainWrapper = styled.div`
  height: 90vh;
  display: flex;
  align-items: center;
`

export const LoginWrapper = styled.form`
  margin: 0 auto;
  gap: 10px;
  place-content: center;
  justify-items: center;
  display: grid;
`;

export const ButtonStyled = styled(Button)`
  color: #ffffff;
`

export const ErrorMessage = styled.p` 
  color: #E78062;
  font-weight: bold;
`
