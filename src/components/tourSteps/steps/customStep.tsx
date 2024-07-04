import React from 'react';

const CustomStep: React.FC<{firstContent: React.ReactNode, secondContent: string}> = ({firstContent, secondContent}) => (
  <div>
    <p>{firstContent}</p>
    <p>{secondContent}</p>
  </div>
);

export default CustomStep;