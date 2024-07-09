import React from 'react';
import { StoreHelpers, TooltipRenderProps } from 'react-joyride';
import { Button } from '@mui/material';
import { customStyles, theme } from '@/constants/theme';
import { CustomStep } from '../steps';

interface CustomTooltipProps extends Omit<TooltipRenderProps, 'step'> {
  joyrideRef: React.MutableRefObject<StoreHelpers | null>;
  step: CustomStep;
  size: number;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
  size,
  joyrideRef,
}) => (
  <div
    {...tooltipProps}
    style={{
      backgroundColor: '#ffffff',
      borderRadius: '5px',
      fontFamily: `${customStyles.fonts.robotoSansSerif}`,
      fontSize: '0.98rem',
      minWidth: '300px',
      padding: '5px',
    }}
  >
    <div style={{ padding: '15px' }}>
      {step.title && <h3 style={{ color: `${theme.colorSchemes.light.palette.primary.main}`, textAlign:"center" }}>{step.title}</h3>}
      <div style={{ color: `${theme.colorSchemes.light.palette.common.black}`, maxWidth: '450px', textAlign: 'center' }}>
        {step.content}
      </div>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>{index + 1} / {size}</span>
        <div>
          <Button {...primaryProps}  color="primary">
            {continuous ? 'Next' : 'Close'}
          </Button>
          {(step.id === 'addRemoveLevel') && (
            <Button variant="contained" color="primary" onClick={() => joyrideRef.current?.next()}>Next</Button>
          )}
          {
            step.id === 'intro' && <Button variant="contained" color="primary" onClick={() => joyrideRef.current?.next()} >START THE TOUR!</Button>
          }
        </div>
      </div>
    </div>
  </div>
);