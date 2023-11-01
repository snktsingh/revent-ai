import { Button, Stack } from '@mui/material';
import { ButtonName, MainIconButton } from './style';

interface ICustomButtonProps {
  icon: string;
  name: string;
}
const IconButton = (props: ICustomButtonProps) => {
  return (
    <MainIconButton>
      <Stack direction="row" spacing={1}>
        <img src={props.icon} />
        <ButtonName>{props.name}</ButtonName>
      </Stack>
    </MainIconButton>
  );
};
export default IconButton;
