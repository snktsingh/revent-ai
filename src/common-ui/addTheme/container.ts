import ENDPOINT from '@/constants/endpoint';
import { FetchUtils } from '@/utils/fetch-utils';
import { useState } from 'react';

const UseCreateTheme = () => {
  const [isCreating, setIsCreating] = useState(false);

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
    } catch (Error) {
      console.log(Error);
    }
  };
  return { setThemeURL, isCreating, setIsCreating };
};
export default UseCreateTheme;
