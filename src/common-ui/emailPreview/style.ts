import { Box } from '@mui/material';
import styled from 'styled-components';

export const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const MessageContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 40vh;
  width: 35%;
  padding: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin-top: 15%;
  border-radius: 5%;
`;
export const Message = styled.p`
  margin: 5px;
  font-size: 17px;
  color: grey;
  text-align: center;
`;
