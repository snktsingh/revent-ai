import { theme } from '@/constants/theme';
import { Divider } from '@mui/material';
import styled from 'styled-components';

const VerticalDivider = () => {
  return <CustomWhiteDivider orientation="vertical" />;
};

export default VerticalDivider;

const CustomWhiteDivider = styled(Divider)`
  background-color: ${theme.colorSchemes.light.palette.common.white} !important;
  height: 2vh !important;
  display: flex;
  align-self: center;
`;
