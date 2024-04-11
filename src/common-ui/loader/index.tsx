import { Loader } from '@/constants/media';
import { LoadContainer, LoaderTitle } from './style';
import '../../styles/base/base.css';
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/store';
import NotFound from '@/pages/notFound';
import FileNotFound from '../fileNotFound';
const ReventingLoader = () => {
  const { unAuthMessage } = useAppSelector(state => state.thunk);
  if (unAuthMessage) {
    return <FileNotFound />;
  } else {
    return (
      <LoadContainer>
        <img src={Loader} />
        <br />
        <LoaderTitle>
          Hold on, we’re Reventing the presentation for you
        </LoaderTitle>
      </LoadContainer>
    );
  }
};
export default ReventingLoader;
