import { CanvasHeaderInput } from './style';

interface IInputProps {
  placeholder: string;
}
const TitleInput = (props: IInputProps) => {
  return (
    <CanvasHeaderInput
      variant="standard"
      placeholder={props.placeholder}
    />
  );
};
export default TitleInput;
