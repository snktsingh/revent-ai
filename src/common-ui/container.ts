import { useAppDispatch } from '@/redux/store';
// import { userAuthenticate } from '@/redux/thunk/thunk';

export default function UseAuthentication() {
  const dispatch = useAppDispatch();
  const fetchToken = async () => {
    // const res = await dispatch(userAuthenticate());
    // console.log(res);
  };
  return { fetchToken };
}
