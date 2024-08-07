import React from 'react';
import { StyledText } from '../style';

const CustomStep: React.FC<{firstContent: React.ReactNode, secondContent: string}> = ({firstContent, secondContent}) => (
  <div>
    <StyledText>{firstContent}</StyledText>
    <StyledText style={{marginTop:'-7px'}}>{secondContent}</StyledText>
  </div>
);

export default CustomStep;