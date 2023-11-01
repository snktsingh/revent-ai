import { CanvasHeaderInput } from './style';

interface IInputProps {
  placeholder: string;
}
const TitleInput = (props: IInputProps) => {
  return (
    <CanvasHeaderInput
      inputProps={{ style: { textAlign: 'center' } }}
      placeholder={props.placeholder}
    />
  );
};
export default TitleInput;
