import { useAppDispatch, useAppSelector } from '@/redux/store';
import { CanvasHeaderInput } from './style';
import { setPresentationTitle } from '@/redux/reducers/canvas';

interface IInputProps {
  placeholder: string;
  value : string;
  
}
const TitleInput = (props: IInputProps) => {
  
  return (
    <CanvasHeaderInput
      placeholder={props.placeholder}
      value={props.value}
    />
  );
};
export default TitleInput;
