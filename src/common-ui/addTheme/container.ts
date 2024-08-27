import ENDPOINT from '@/constants/endpoint';
import { setTextColor } from '@/redux/reducers/canvas';
import { FetchUtils } from '@/utils/fetch-utils';
import { useState } from 'react';

const UseCreateTheme = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [inputTextColor, setInputTextColor] = useState<any>('');

  const setThemeURL = async (url: string, logo: any) => {
    const logoTheme = new FormData();
    if (url !== '') {
      logoTheme.append('websiteUrl', url);
    } else {
      logoTheme.append('logo', logo);
    }
    try {
      setIsCreating(true);
      const res = await FetchUtils.postRequest(
        `${ENDPOINT.THEME.SET_THEME_URL}`,
        logoTheme
      );
      setIsCreating(false);
      console.log(res);
      setTextColor(res.data.color);
    } catch (Error) {
      console.log(Error);
    }
  };
  return {
    setThemeURL,
    isCreating,
    setIsCreating,
    inputTextColor,
    setInputTextColor,
  };
};
export default UseCreateTheme;
