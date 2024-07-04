import React, { ReactElement } from 'react';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import CustomTooltipContent from './CustomTooltipContent';

const CustomStyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#ffffff',
    border: '1px solid #ccc',
    maxWidth: 'none',
    padding: '1px 2px',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px'
},
[`& .${tooltipClasses.arrow}`]: {
    color: '#ffffff',
    '&::before': {
        border: '1px solid #ccc', 
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px'
    },
  },
});

interface CustomTooltipProps extends Omit<TooltipProps, 'children' | 'title'> {
  tourVisible: boolean;
  tooltipContent: string;
  children: ReactElement<any, any>;
}

const CustomTourTooltip: React.FC<CustomTooltipProps> = ({ tourVisible, tooltipContent, children, ...restProps }) => {
  return (
    <CustomStyledTooltip
      PopperProps={{
        disablePortal: true,
      }}
      arrow
      title={<CustomTooltipContent ChildName={tooltipContent} />}
      open={tourVisible} 
      placement={tooltipContent === 'edit' ? 'left' : 'bottom'}
      {...restProps}
    >
      <span>{children}</span>
    </CustomStyledTooltip>
  );
};

export default CustomTourTooltip;
