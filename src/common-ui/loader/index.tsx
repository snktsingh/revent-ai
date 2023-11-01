import { Loader } from '@/constants/media';
import { LoadContainer, LoaderTitle } from './style';
import '../../styles/base/base.css';
import { useEffect } from 'react';
const ReventingLoader = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.replace('/canvas');
    }, 3000);
  });
  return (
    <LoadContainer>
      <img src={Loader} />
      <br />
      <LoaderTitle>
        Hold on, we’re Reventing the presentation for you
      </LoaderTitle>
    </LoadContainer>
  );
};
export default ReventingLoader;
