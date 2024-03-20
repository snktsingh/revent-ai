import { theme } from '@/constants/theme';
import styled from 'styled-components';

export const ProtectedContainer = styled.div`
  padding: 35px 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  h1 {
    font-size: 10vh;
    margin: 30px;
    color: #004fba;
  }
  h2 {
    font-size: 4vh;
    margin-bottom: 20px;
  }
  p {
    font-size: 2vh;
  }
`;
export const Content = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const MailLink = styled.a`
  text-decoration: none;
  color: #000;
  display: flex;
  align-items: center;
  gap: 6px;
`;
