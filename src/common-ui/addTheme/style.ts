import { Button, FilledInput } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

export const ColorContainer = styled.span`
  cursor: pointer;
  width: 25%;
  border: 2px dashed #ccc;
  border-radius: 10px;
  height: 50px;
`;
export const ThemeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
`;
export const LogoContainer = styled.span`
  width: 200px;
  height: 150px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const PreviewContainer = styled.span`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const FileUploadDiv = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FileUploadLabel = styled.label`
  cursor: pointer;
  padding: 1rem 8rem;
  border: 2px dashed #ccc;
  border-radius: 5px;

  &.dragover {
    border-color: #004fba;
  }
`;

export const FileUploadDesign = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export const BrowseButton = styled.span`
  background-color: #3371c8;
  padding: 5px 15px;
  border-radius: 10px;
  color: white;
  transition: all 0.3s;

  &:hover {
    background-color: #004fba;
  }
`;

export const StyledFileInput = styled.input`
  display: none;
`;

export const StyledCloudUploadIcon = styled(DriveFolderUploadIcon)`
  && {
    font-size: 5rem;
    fill: rgb(82, 82, 82);
    margin-bottom: 20px;
  }
`;

export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledText = styled.p`
  text-align: center;
  line-height: 1.6;
  font-size: 0.9rem;
`;

export const LoaderContainer = styled.div`
  width: 350px;
  height: 180px;
  border-radius: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 30px;
  margin: 1rem 4rem;
  /* box-shadow: 2px 2px 10px -5px lightgrey; */
`;

const blinkAnimation = keyframes`
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
`;

const loadingAnimation = keyframes`
  0% {
    left: 25%;
  }
  100% {
    left: 50%;
  }
  0% {
    left: 0%;
  }
`;

export const LoadingBar = styled.div`
  width: 100%;
  height: 10px;
  background: lightgrey;
  border-radius: 10px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 10px;
    background: #004fba;
    border-radius: 10px;
    z-index: 1;
    animation: ${loadingAnimation} 0.6s alternate infinite;
  }
`;

export const Label = styled.label`
  color: #002;
  font-size: 18px;
  animation: ${blinkAnimation} 0.6s alternate infinite;
`;
//card
export const Card = styled.div`
  width: 100%;
  max-width: 280px;
  height: 60px;
  background: #353535;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: left;
  backdrop-filter: blur(10px);
  transition: 0.5s ease-in-out;
  margin-top: 10px;
  opacity: 0;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  animation: fadeIn 0.5s ease-in forwards;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Img = styled.div`
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  background: linear-gradient(135deg, #ff8c00, #d24726);
  display: flex;
  justify-content: center;
  align-items: center;
  
  ${Card}:hover & {
    transition: 0.5s ease-in-out;
  }
`;

export const TextBox = styled.div`
  width: calc(100% - 90px);
  margin-left: 10px;
  color: white;
  font-family: 'Poppins', sans-serif;
`;

export const H1 = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

export const TextContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

