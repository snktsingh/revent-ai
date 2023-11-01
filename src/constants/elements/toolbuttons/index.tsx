import { Button, Stack } from '@mui/material';
import { CustomToolButton, ToolTitle } from './style';

interface IToolButton {
  name: string;
  leftIcon: string;
  rightIcon: string;
}
const ToolButton = (props: IToolButton) => {
  return (
    <CustomToolButton>
      <Stack direction="row" spacing={1}>
        <img src={props.leftIcon} />
        <ToolTitle> {props.name}</ToolTitle>
        <img src={props.rightIcon} />
      </Stack>
    </CustomToolButton>
  );
};
export default ToolButton;
