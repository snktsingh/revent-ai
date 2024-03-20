import DecryptData from '@/components/decryption';
import { getFromLS } from '.';

export const tempToken = getFromLS('token');
export const Token = getFromLS('token');
export const isAuth = getFromLS('isAuth');
