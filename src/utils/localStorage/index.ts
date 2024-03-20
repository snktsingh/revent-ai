export const setToLS = (key: string, value: any) => {
  return localStorage.setItem(key, value);
};

export const getFromLS = (key: string) => {
  return localStorage.getItem(key);
};
