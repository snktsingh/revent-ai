import React from 'react';
import { StyledText } from '../style';

const AddProcessStep: React.FC = () => (
  <div>
    <StyledText>For this tutorial</StyledText>
    <StyledText style={{marginTop:'-7px'}}>Choose the "Process" element to continue.</StyledText>
  </div>
);

export default AddProcessStep;